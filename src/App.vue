<template>
  <div class='app'>
    <Radio :label='1' v-model='radio' border>备选项1</Radio>
    <Radio :label='2' v-model='radio' disabled border>备选项2</Radio>
    <Radio :label='3' v-model='radio' border>备选项3</Radio>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Radio,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Radio,
  },
  setup() {
    const appName = ref('app');
    const radio = ref(2);

    return {
      appName,
      radio,
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .item {
    color: #000;
    background-color: #a8a6a6;
  }
</style>
