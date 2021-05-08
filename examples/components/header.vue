<template>
  <div class='header-container'>
    <div class='left'>
      <div class='title'>
        {{data?.title}}
      </div>
    </div>
    <ul class='right'>
      <li>组件 ({{componentCount}})</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Header } from '../config';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Header>,
    },
    componentCount: Number,
  },
  setup() {
    return [];
  },
});
</script>

<style lang='less'>
  .header-container {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 3px 6px rgba(217, 217, 217, .4);
    background-color: #fff;
    justify-content: space-between;
  }

  .right {
    list-style: none;
    margin: 0 10% 0 0;
    padding: 0;

    li {
      color: #40a9ff;
      font-size: 16px;
      cursor: pointer;
    }

    li.active {
      color: #1890ff;
    }
  }
</style>
