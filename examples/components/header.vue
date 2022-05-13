<template>
  <div class="header-container">
    <div class="left">
      <div class="title">
        {{ $route.meta.title ?? data?.title }}
        <span class="beat" v-if="$route.meta.beta || data?.beta">beta</span>
      </div>
    </div>
    <ul class="right">
      <li @click="jumpPage('/')">组件 ({{ componentCount }})</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    return {
      jumpPage(path: string) {
        router.push(path);
      },
    };
  },
});
</script>

<style lang="less">
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
  box-shadow: 0 3px 6px rgba(217, 217, 217, 0.4);
  background-color: #fff;
  justify-content: space-between;
}

.left {
  .title {
    color: #1890ff;
    font-size: 28px;
    text-shadow: -1px 3px 3px #c6ddf5;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    cursor: pointer;
    position: relative;

    .beat {
      color: #fff;
      font-size: 12px;
      text-shadow: none;
      position: absolute;
      background-color: #f56c6c;
      padding: 0 7px;
      border-radius: 25px;
      top: -10px;
    }
  }
}

.right {
  list-style: none;
  margin: 0 10% 0 0;
  padding: 0;

  li {
    color: #1890ff;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  li.active {
    color: #1890ff;
  }
}
</style>
