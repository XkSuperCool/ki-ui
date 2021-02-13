<template>
  <div class='container'>
    <div class='header'>
      <p class='title'>{{title}}</p>
      <p class='sub-title'>{{subTitle}}</p>
    </div>
    <div class='content'>
      <div class='example'>
        <slot></slot>
      </div>
      <div class='coder' v-if='showCoder'>
        <slot name='coder'>...</slot>
      </div>
      <div class='bottom-controller' @click='showCoder = !showCoder'>
        <span v-if='!showCoder'>展示代码</span>
        <span v-else>隐藏代码</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Container',
  props: {
    title: String,
    subTitle: String,
  },
  setup() {
    const showCoder = ref(false);
    return {
      showCoder,
    };
  },
});
</script>

<style scoped lang='less'>
  .container {
    margin-bottom: 20px;

    .header {
      margin-bottom: 20px;

      .title {
        color: var(--color);
        font-size: 25px;
        line-height: 1.5;
        margin: 0 0 10px 0;
      }

      .sub-title {
        color: var(--color-minor);
        font-size: 14px;
        margin: 0;
      }
    }

    .content {
      border: 1px solid var(--border-color);
      border-radius: 3px;
      transition: box-shadow .3s;
      box-sizing: border-box;

      &:hover {
        box-shadow: 0 0 12px rgba(217, 217, 217, .5);
      }

      .example {
        padding: 20px;
        box-sizing: border-box;
      }

      .coder {
        padding: 20px;
        box-sizing: border-box;
        background-color: #f1f8fa;
        border-top: 1px solid var(--border-color);
      }

      .bottom-controller {
        font-size: 14px;
        color: var(--primary-color);
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        height: 50px;
        border-top: 1px solid var(--border-color);
      }
    }
  }
</style>
