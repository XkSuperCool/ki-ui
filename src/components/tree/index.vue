<template>
  <div class='ki-tree'>
    <node
      v-for='item in treeData'
      :key='item.key'
      :data='item'
      :show-checkbox='showCheckbox'
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
  key: string | number;
  children?: TreeData[];
}

interface NodeData {
  checked?: boolean;
  expand?: boolean;
  halfChecked?: boolean;
  mount?: boolean;
}

export type TreeNodeData = TreeData & NodeData;

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
    showCheckbox: Boolean,
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
    defaultCheckedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
  },
  setup(props) {
    const cloneHook = (obj: any) => {
      const tmpObj: NodeData = {};
      if (props.defaultCheckedKeys.includes(obj.key)) {
        tmpObj.checked = true;
      }
      return tmpObj;
    };
    const treeData = reactive<TreeNodeData[]>(deepClone(props.data, ['label', 'key', 'children'], cloneHook));
    return {
      treeData,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
