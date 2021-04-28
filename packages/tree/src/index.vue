<template>
  <div class='ki-tree'>
    <node
      v-for='item in treeData'
      :key='item.key'
      :data='item'
      :show-checkbox='showCheckbox'
    >
      <template #default='data'>
        <slot :data='{...data.data}'></slot>
      </template>
    </node>
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
  disabled?: boolean;
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
  name: 'ki-tree',
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
    // 子级选中递归函数
    function childrenChecked(children: TreeNodeData[]) {
      children.forEach((item: TreeNodeData) => {
        // eslint-disable-next-line no-param-reassign
        item.checked = true;
        if (item.children && item.children.length) {
          childrenChecked([...item.children]);
        }
      });
      return children;
    }

    const cloneHook = (obj: any) => {
      const tmpObj: Omit<TreeNodeData, 'key'| 'label'> = {};
      if (props.defaultCheckedKeys.includes(obj.key)) {
        tmpObj.checked = true;

        if (obj.children) {
          tmpObj.children = childrenChecked([...obj.children]);
        }
      }
      if (props.defaultExpandedKeys.includes(obj.key)) {
        tmpObj.expand = true;
        tmpObj.mount = true;
      }
      return tmpObj;
    };
    const treeData = reactive<TreeNodeData[]>(deepClone(props.data, ['label', 'key', 'children', 'disabled'], cloneHook));
    return {
      treeData,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
