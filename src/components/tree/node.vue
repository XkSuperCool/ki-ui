<template>
  <ul class='ki-tree-nodes'>
    <li class='ki-tree-node' @click.stop='handleExpansion'>
      <div class='ki-node-container'>
        <div class='ki-node-expansion'>
          <div class='ki-node-expansion-icon' v-if='data.children && !!data.children.length'>
            <ki-icon type='caret-right' :class='{active: data.expand}' />
          </div>
        </div>
        <div class='ki-node-checked' v-if='showCheckbox'>
          <ki-check-box
            :model-value='data.checked'
            :indeterminate='data.halfChecked'
            @input='() => handleChecked(data)'
            :disabled='data.disabled'
          />
        </div>
        <div class='ki-node-content'>{{data.label}}</div>
        <div class='ki-tree-slots' @click.stop>
          <slot :data='{key: data.key, label: data.label, disabled: data.disabled}'></slot>
        </div>
      </div>
      <template v-if='data.mount'>
        <div
          v-show='data.expand'
          v-for='item in data.children'
          :key='item.key'
          class='ki-tree-child'
          :class='{"ki-tree-child-checkbox": showCheckbox}'
        >
          <tree-node :data='item' :show-checkbox='showCheckbox'>
            <slot :data='{key: item.key, label: item.label, disabled: item.disabled}'></slot>
          </tree-node>
        </div>
      </template>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, watch } from 'vue';
import type { PropType } from 'vue';
import Icon from '../icon';
import CheckBox from '../checkbox';
import type { TreeNodeData } from './index.vue';

export default defineComponent({
  name: 'TreeNode',
  props: {
    data: {
      type: Object as PropType<TreeNodeData>,
      required: true,
    },
    showCheckbox: Boolean,
  },
  components: {
    KiIcon: Icon,
    KiCheckBox: CheckBox,
  },
  setup(props) {
    /**
     * 处理展开逻辑
     * */
    const handleExpansion = () => {
      if (!props.data.mount) {
        // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
        props.data.mount = true; // 已挂载，已经挂载上了，就不用在重复 v-if 渲染，后面使用 display 控制
      }
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
          // 同步子级状态与父级相同，父级选中 子级也要选中
          handleChecked(data.children[i], data.checked);
        }
      }
    };

    // 半选中，递归判断
    const isHalfChecked = (children: TreeNodeData[]): boolean => {
      for (let i = 0, len = children.length; i < len; i += 1) {
        if (children[i].checked) {
          return true;
        }
      }
      for (let i = 0, len = children.length; i < len; i += 1) {
        if (children[i].children) {
          return isHalfChecked(children[i].children as TreeNodeData[]);
        }
      }
      return false;
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
        props.data.checked = checkedChildrenLength === childrenLength; // 父级选中状态
        // eslint-disable-next-line no-param-reassign,vue/no-mutating-props
        props.data.halfChecked = isHalfChecked(children); // 父级半选中状态
      }
    }, { deep: true, immediate: true });

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
