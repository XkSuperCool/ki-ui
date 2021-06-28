<template>
  <div class='ki-table-container' :style='{height: height + "px"}' ref='tableContainerRef'>
    <div class='ki-table-header'>
      <table :cellspacing='0' :cellpadding='0' class='ki-table' :class='{border: border}' :style='{width: tableWidth + "px"}'>
        <colgroup>
          <col v-for='column in columns' :key='column.key' :width='getColumnWidth(column)' />
        </colgroup>
        <thead>
          <tr>
            <th v-for='column in columns' :key='column.key' :class='getColumnClass(column)'>
              {{column.title}}
            </th>
            <th style='width: 17px; padding: 0;' v-if='isFixedHead'></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class='ki-table-body' :style='{height: height - 50 + "px"}' :class='{fixedHead: isFixedHead}'>
      <table :cellspacing='0' :cellpadding='0' class='ki-table' :class='{border: border, stripe: stripe}' :style='{width: (isFixedHead ? tableWidth - 17 : tableWidth) + "px"}'>
        <colgroup>
          <col v-for='column in columns' :key='column.key' :width='getColumnWidth(column)' />
        </colgroup>
        <tbody>
          <tr v-for='(item, index) in data' :key='item.id' :class='[rowClassName && rowClassName(item, index)]'>
            <td v-for='column in columns' :key='column.key' :class='getColumnClass(column)'>
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
import {defineComponent, h, computed, ref, onMounted, onUnmounted} from 'vue';
import type { PropType, VNode } from 'vue';
import KiRender from '@/components/render';

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
    rowClassName: Function as PropType<(row: Record<string, unknown>, index: number) => string | undefined>,
  },
  setup(props) {
    const tableContainerRef = ref<HTMLDivElement | null>(null);
    const tableWidth = ref(0);
    // 是否固定表头
    const isFixedHead = computed(() => props.height && props.height > 0);

    const getColumnClass = (column: TableColumn) => {
      const cssClass = [];
      column.align && cssClass.push(`is_${column.align}`);
      return cssClass;
    };

    const getColumnWidth = (column: TableColumn) => {
      let len = 0, width = 0;
      props.columns.forEach((item) => {
        if (item.width) {
          width += item.width;
        } else {
          len += 1;
        }
      });
      if (column.width) {
        return column.width;
      }
      const columnWidth = (tableWidth.value - width) / len;
      return columnWidth < 80 ? 80 : columnWidth;
    };
    const getTableWidth = () => {
      let minWidth = 0;
      props.columns.forEach((item) => {
        minWidth = item.width ? minWidth + item.width : minWidth + 80;
      });
      if (tableContainerRef.value) {
        const width = tableContainerRef.value.getBoundingClientRect().width;
        tableWidth.value = width < minWidth ? minWidth : width;
      }
    }
    onMounted(() => {
      getTableWidth();
      window.addEventListener('resize', getTableWidth);
    });
    onUnmounted(() => window.removeEventListener('resize', getTableWidth));

    return {
      tableWidth,
      tableContainerRef,
      isFixedHead,

      getColumnClass,
      getColumnWidth,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style';
</style>
