<template>
  <div class='ki-tree'>
    <ki-tree :data='treeData' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Tree } from '@/components';

export default defineComponent({
  name: 'TreeExample',
  components: {
    KiTree: Tree,
  },
  setup() {
    return {
      treeData: [
        {
          checked: true,
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
          children: [
            {
              label: '二级 1-1',
              key: 5,
              children: [{
                label: '三级 1-1-1',
                key: 6,
              }],
            },
            {
              label: '二级 1-2',
              key: 10,
            },
          ],
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
</style>
