<template>
  <div class='ki-tree'>
    <Container
      title='基本使用'
      sub-title='基础的树形结构展示。'
    >
      <ki-tree
        :data='treeData'
      />
    </Container>
    <Container
      title='可选择'
      sub-title='适用于需要选择层级时使用。'
    >
      <ki-tree
        :data='treeData'
        show-checkbox
      />
    </Container>
    <Container
      title='默认选中和默认展开'
      sub-title='可将 Tree 的某些节点设置为禁用状态。'
    >
      <ki-tree
        :data='treeData'
        show-checkbox
        :default-expanded-keys='["1", "1-2", "1-1", "2"]'
        :default-checked-keys='["1-1-1", "2-1"]'
      />
    </Container>
    <Container
      title='禁用状态'
      sub-title='可将 Tree 的某些节点设置为默认展开或默认选中。'
    >
      <ki-tree
        :data='treeData2'
        show-checkbox
        :default-expanded-keys='["1", "1-2", "1-1", "2"]'
        :default-checked-keys='["1-1", "2-1"]'
      />
    </Container>
    <Container
      title='自定义节点内容'
      sub-title='节点的内容支持自定义，可以在节点区添加按钮或图标等内容。'
    >
      <ki-tree
        :data='treeData'
        show-checkbox
        :default-expanded-keys='["1", "1-2", "1-1", "2"]'
        :default-checked-keys='["1-1-1", "2-1"]'
      >
        <template #default='{data}'>
          <a :key='data.key' class='btn'>Button</a>
        </template>
      </ki-tree>
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
          key: '1',
          children: [{
            label: '二级 1-1',
            key: '1-1',
            children: [
              {
                label: '三级 1-1-1',
                key: '1-1-1',
                children: [
                  {
                    label: '四级 1-1-1-1',
                    key: '1-1-1-1',
                  },
                ],
              },
              {
                label: '三级 1-1-2',
                key: '1-1-2',
              },
            ],
          }],
        },
        {
          label: '一级 2',
          key: '2',
          children: [
            {
              label: '二级 2-1',
              key: '2-1',
              children: [{
                label: '三级 2-1-1',
                key: '2-1-1',
              }],
            },
            {
              label: '二级 2-2',
              key: '2-2',
            },
          ],
        },
      ],
      treeData2: [
        {
          checked: true,
          label: '一级 1',
          key: '1',
          children: [{
            label: '二级 1-1',
            key: '1-1',
            disabled: true,
            children: [
              {
                label: '三级 1-1-1',
                key: '1-1-1',
                children: [
                  {
                    label: '四级 1-1-1-1',
                    key: '1-1-1-1',
                  },
                ],
              },
              {
                label: '三级 1-1-2',
                key: '1-1-2',
                disabled: true,
              },
            ],
          }],
        },
        {
          label: '一级 2',
          key: '2',
          children: [
            {
              label: '二级 2-1',
              key: '2-1',
              disabled: true,
              children: [{
                label: '三级 2-1-1',
                key: '2-1-1',
              }],
            },
            {
              label: '二级 2-2',
              key: '2-2',
            },
          ],
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
  .btn {
    font-size: 13px;
    color: var(--primary-shallow-color);
  }
</style>
