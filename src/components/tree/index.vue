<template>
  <div class='ki-tree'>
    <node
      v-for='item in treeData'
      :key='item.key'
      :data='item'
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import { deepClone } from '@/utils';
import Node from './node.vue';

export interface TreeData {
  label: string;
  key: string;
  children?: TreeData[];
}

export interface TreeNodeData extends TreeData {
  checked?: boolean;
  expand?: boolean;
  halfChecked?: boolean;
}

export default defineComponent({
  name: 'Tree',
  components: {
    Node,
  },
  props: {
    data: {
      type: Array as PropType<TreeData[]>,
      default: () => [],
    },
  },
  setup(props) {
    const treeData = reactive<TreeNodeData[]>(deepClone(props.data, ['label', 'key', 'children']));
    return {
      treeData,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
