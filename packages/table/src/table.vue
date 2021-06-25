<template>
  <div class='ki-table-container' :style='{height: height + "px"}'>
    <div class='ki-table-header'>
      <table :cellspacing='0' :cellpadding='0' class='ki-table' :class='{border: border}'>
        <thead>
          <tr>
            <th v-for='column in columns' :key='column.key' :style='getStyle(column)'>
              {{column.title}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='item in [data[0] ?? {}]' :key='item.id'>
            <td v-for='column in columns' :key='column.key'>
              <template v-if='column.key'>
                {{item[column.key]}}
              </template>
              <template v-if='column.render'>
                <ki-render :render='column.render'/>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class='ki-table-body' :style='{height: height - 50 + "px"}' :class='{fixedHead: Boolean(height)}'>
      <table :cellspacing='0' :cellpadding='0' class='ki-table' :class='{border: border, stripe: stripe}'>
        <tbody>
          <tr v-for='(item, index) in data' :key='item.id' :class='[rowClassName && rowClassName(item, index)]'>
            <td v-for='column in columns' :key='column.key' :style='getStyle(column)'>
              <template v-if='column.key'>
                {{item[column.key]}}
              </template>
              <template v-if='column.render'>
                <ki-render :render='column.render'/>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if='data.length === 0' class='ki-table-empty' :class='{border: border}'>
        暂无数据...
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, h } from 'vue';
import type { PropType, VNode } from 'vue';
import KiRender from '@/components/render';
import { useStyle } from './table';

export interface TableColumn {
  key?: string | number;
  title: string;
  width?: number,
  align?: 'left' | 'right' | 'center',
  render?: (render: typeof h) => VNode | VNode[],
}

export default defineComponent({
  name: 'KiTable',
  components: {
    KiRender,
  },
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    border: Boolean,
    stripe: Boolean,
    height: Number,
    rowClassName: Function as PropType<(row: any, index: number) => string | undefined>,
  },
  setup() {
    // 表格 style 生成
    const getStyle = useStyle();

    return {
      getStyle,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style';
</style>
