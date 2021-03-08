<template>
  <div class='ki-tree'>
<!--    <Container-->
<!--      title='基本使用'-->
<!--      sub-title='基础的树形结构展示。'-->
<!--    >-->
<!--      <ki-tree-->
<!--        :data='treeData'-->
<!--      />-->
<!--    </Container>-->
    <Container
      title='可选择'
      sub-title='适用于需要选择层级时使用。'
    >
      <ki-tree
        :data='treeData'
        show-checkbox
        :default-checked-keys='[2, 5]'
      />
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Tree } from '@/components';
import { Container } from './component';

export default defineComponent({
  name: 'TreeExample',
  components: {
    Container,
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
