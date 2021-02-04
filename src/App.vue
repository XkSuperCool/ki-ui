<template>
  <div class='app'>
    <Calendar />
    <Button>{{appName}}</Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Button,
  Calendar,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Calendar,
  },
  setup() {
    const appName = ref('app');

    return {
      appName,
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
