<template>
  <div class='demo-block'>
    <div class='source-code'>
      <slot name='source'></slot>
    </div>
    <div class='example-code' v-show='isShowExampleCode'>
      <div class='description' v-if='isShowDescriptionSlot'>
        <slot name='description'></slot>
      </div>
      <slot></slot>
    </div>
    <div class='bottom-controller' @click='isShowExampleCode = !isShowExampleCode'>
      <span v-if='!isShowExampleCode'>展示代码</span>
      <span v-else>隐藏代码</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent } from 'vue';
import 'highlight.js/styles/atom-one-light.css';

export default defineComponent({
  setup(_, { slots }) {
    const isShowExampleCode = ref(false);
    const isShowDescriptionSlot = slots.description;

    return {
      isShowExampleCode,
      isShowDescriptionSlot
    };
  },
});
</script>

<style scoped lang='less'>
  .demo-block {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    transition: box-shadow .3s;
    box-sizing: border-box;

    &:hover {
      box-shadow: 0 0 12px rgba(217, 217, 217, .5);
    }

    .source-code {
      padding: 20px;
      box-sizing: border-box;
    }
    :deep(.example-code) {
      padding: 15px 0;
      box-sizing: border-box;
      background-color: #fafafa;
      border-top: 1px solid #d9d9d9;

      pre {
        margin: 0;
      }

      code {
        color: '#1f2f3d';
        font-size: 12px;
        font-family: Menlo, Monaco, Consolas, Courier, monospace, "微软雅黑";
      }
    }

    .description {
      padding: 0 15px;
      margin: 0 15px 15px 15px;
      border: 1px solid #d9d9d9;
      background-color: #fff;

      :deep(code) {
        color: #5e6d82;
        background-color: #e6effb;
        padding: 2px 5px;
        border-radius: 3px;
      }
    }

    .bottom-controller {
      font-size: 14px;
      color: #1890ff;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      height: 50px;
      border-top: 1px solid #d9d9d9;
    }
  }
</style>