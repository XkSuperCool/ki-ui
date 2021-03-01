<template>
  <div class='ki-tree-node'>
    <div class='ki-node-container'>
      <div class='ki-node-expansion'>
        <ki-icon type='caret-right' />
      </div>
      <div class='ki-node-content'>{{node.label}}</div>
    </div>
    <template v-if='true'>
      <div v-if='node.children && node.children.length' style='padding-left: 20px;'>
        <tree-node :node='node.children[0]'></tree-node>
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Icon from '../icon';

export default defineComponent({
  name: 'TreeNode',
  props: {
    node: Object,
  },
  components: {
    KiIcon: Icon,
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
