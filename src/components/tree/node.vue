<template>
  <ul class='ki-tree-nodes'>
    <li class='ki-tree-node'>
      <div class='ki-node-container'>
        <div class='ki-node-expansion'>
          <div class='ki-node-expansion-icon' @click='handleExpansion' v-if='data.children && !!data.children.length'>
            <ki-icon type='caret-right' />
          </div>
        </div>
        <div class='ki-node-checked'>
          <input type='checkbox' :checked='data.checked' @input='handleChecked(data)' />
          <span v-if='data.halfChecked'>-</span>
        </div>
        <div class='ki-node-content'>{{data.label}}</div>
      </div>
      <template v-if='data.expand'>
        <div style='padding-left: 20px;' v-for='item in data.children' :key='item.key'>
          <tree-node :data='item'></tree-node>
        </div>
      </template>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, watch } from 'vue';
import type { PropType } from 'vue';
import Icon from '../icon';
import type { TreeNodeData } from './index.vue';

export default defineComponent({
  name: 'TreeNode',
  props: {
    data: {
      type: Object as PropType<TreeNodeData>,
      required: true,
    },
  },
  components: {
    KiIcon: Icon,
  },
  setup(props) {
    /**
     * 处理展开逻辑
     * */
    const handleExpansion = () => {
      // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
      props.data.expand = !props.data.expand;
    };

    /**
     * 处理选择框选中状态
     * */
    const handleChecked = (data: TreeNodeData, checked?: boolean) => {
      // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
      data.checked = checked ?? !data.checked;
      if (data.children && data.children.length) {
        for (let i = 0, len = data.children.length; i < len; i += 1) {
          // 同步子级状态与父级相同
          handleChecked(data.children[i], data.checked);
        }
      }
    };

    /**
     * 监听 children 的变化，然后再判断 children 下面的每一项的选中状态，
     * 最后给当前 data 的选中状态赋值。
     */
    watch(() => props.data.children, (children) => {
      if (children && children.length) {
        const childrenLength = children.length;
        // 获取选中的子级
        const checkedChildrenLength = children.filter((child: TreeNodeData) => child.checked).length;
        // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
        props.data.checked = checkedChildrenLength === childrenLength;
        // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
        props.data.halfChecked = checkedChildrenLength > 0 && checkedChildrenLength !== childrenLength;
      }
    }, { deep: true });

    return {
      handleExpansion,
      handleChecked,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
