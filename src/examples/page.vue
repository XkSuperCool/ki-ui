<template>
  <div>
    <Container
      title='基本使用'
      sub-title='提供 currentPage pageSize total 三个属性，就可以展示一个基本的分页器'
    >
      <p class='tip'>数量多时：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' />
      <p class='tip'>数量少时：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='40' />
    </Container>
    <Container
      title='带有背景色'
    >
      <ki-pagination :current-page='1' :page-size='10' :total='100' background />
    </Container>
    <Container
      title='小型分页'
      sub-title='在空间有限的情况下，可以使用简单的小型分页。'
    >
      <ki-pagination :current-page='1' :page-size='10' :total='100' background mini />
      <ki-pagination :current-page='1' :page-size='10' :total='100' mini style='margin-top: 20px;'/>
    </Container>
    <Container
      title='附加功能'
      sub-title='根据场景需要，可以添加其他功能模块。'
    >
      <p class='tip'>显示总数：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background is-total />
      <p class='tip'>调整每页条数：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background :pageSizes='[10, 20, 30, 40]' />
      <p class='tip'>电梯：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background elevator />
      <p class='tip'>完整功能：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background :pageSizes='[10, 20, 30, 40]' is-total elevator />
    </Container>
    <Container
      title='只有一页时隐藏'
      sub-title='当只有一页时，通过设置 hide-on-single-page 属性来隐藏分页。'
    >
      <ki-button @click='hide = !hide' style='margin-bottom: 20px;' size='small'>显示/隐藏</ki-button>
      <ki-pagination :current-page='1' :page-size='10' :total='10' background :hide-on-single-page='hide' />
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' target='event' title='Events' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Pagination, Button } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'PageExample',
  components: {
    Container,
    Attributes,
    KiPagination: Pagination,
    KiButton: Button,
  },
  setup() {
    const hide = ref(false);
    return {
      hide,
      attributes: [
        {
          attribute: 'currentPage',
          description: '当前页',
          type: 'number',
          option: '——',
          default: '1',
        },
        {
          attribute: 'pageSize',
          description: '每页条数',
          type: 'number',
          option: '——',
          default: '10',
        },
        {
          attribute: 'total',
          description: '总条数',
          type: 'number',
          option: '——',
          default: '——',
        },
        {
          attribute: 'pageSizes',
          description: '调整分页总数，格式如：[10, 20, 30]',
          type: 'number[]',
          option: '——',
          default: '——',
        },
        {
          attribute: 'background',
          description: '是否显示背景颜色',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'elevator',
          description: '电梯',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'isTotal',
          description: '是否展示出总条数',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'mini',
          description: '迷你模式',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'hideOnSinglePage',
          description: '只有一页时隐藏分页',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
      ],
      events: [
        {
          name: 'currentChange',
          description: '当前页发生变化时触发',
          type: '(current: number) => void',
        },
        {
          name: 'pageSizeChange',
          description: '每页条数发生变化时触发',
          type: '(pageSize: number) => void',
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
  .tip {
    color: var(--color);
    font-size: 14px;
  }
</style>
