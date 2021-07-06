<template>
  <table
      :cellspacing='0'
      :cellpadding='0'
      class='ki-table'
      :class='{border: border, stripe: stripe}'
      style='table-layout: fixed;'
  >
    <colgroup>
      <col v-for='column in columns' :key='column.key' />
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
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import KiRender from '@/components/render';
import { useTable } from './useTable';

export default defineComponent({
  name: 'KiTableBody',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    border: Boolean,
    stripe: Boolean,
    columns: {
      type: Array,
      default: () => [],
    },
    rowClassName: Function as PropType<(row: Record<string, unknown>, index: number) => string | undefined>,
  },
  components: {
    KiRender,
  },
  setup() {
    const { getColumnClass } = useTable();
    return {
      getColumnClass,
    };
  },
});
</script>

<style lang='less'>

</style>
