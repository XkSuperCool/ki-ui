<template>
  <div class='ki-tree'>
    <node v-for='node in data' :key='node.key' :node='node'></node>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Node from './node.vue';

export default defineComponent({
  name: 'Tree',
  components: {
    Node,
  },
  props: {
    data: {
      type: Array,
      default: () => [
        {
          label: '一级 1',
          key: 1,
          children: [{
            label: '二级 1-1',
            key: 2,
            children: [{
              label: '三级 1-1-1',
              key: 3,
            }],
          }],
        },
        {
          label: '一级 1',
          key: 4,
          children: [{
            label: '二级 1-1',
            key: 5,
            children: [{
              label: '三级 1-1-1',
              key: 6,
            }],
          }],
        },
      ],
    },
  },
});
</script>

<style scoped lang='less'>
@import './style.less';
</style>
