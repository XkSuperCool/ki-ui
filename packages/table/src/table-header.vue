<template>
  <table
    :cellspacing='0'
    :cellpadding='0'
    class='ki-table'
    :class='{border: border}'
    style='table-layout: fixed;'
  >
    <colgroup>
      <col v-for='column in columns' :key='column.key' />
    </colgroup>
    <thead>
    <tr>
      <th v-for='column in columns' :key='column.key' :class='getColumnClass(column)'>
        {{column.title}}
      </th>
      <th style='width: 17px; padding: 0;' v-if='fixedHeader'></th>
    </tr>
    </thead>
  </table>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useTable } from './useTable';

export default defineComponent({
  name: 'KiTableHeader',
  props: {
    border: Boolean,
    columns: {
      type: Array,
      default: () => [],
    },
    fixedHeader: Boolean,
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
