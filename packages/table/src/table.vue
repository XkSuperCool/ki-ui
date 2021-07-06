<template>
  <div class='ki-table-container' :style='{height: height + "px"}'>
    <div class='ki-table-header'>
      <ki-table-header :border='border' :columns='columns' :fixed-header='isFixedHead' />
    </div>
    <div class='ki-table-body' :style='{height: height - 50 + "px"}' :class='{fixedHead: isFixedHead}'>
      <ki-table-body
        :data='data'
        :border='border'
        :stripe='stripe'
        :columns='columns'
        :row-class-name='rowClassName'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import KiTableHeader from './table-header.vue';
import KiTableBody from './table-body.vue';
import type { TableColumn } from './typings';

export default defineComponent({
  name: 'KiTable',
  components: {
    KiTableBody,
    KiTableHeader,
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
    // 是否固定表头
    const isFixedHead = computed(() => props.height && props.height > 0);
    return {
      isFixedHead,
    };
  },
});
</script>

<style lang='less'>
@import './style';
</style>
