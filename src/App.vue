<template>
  <div class='app'>
    <upload multiple action='https://jsonplaceholder.typicode.com/posts/' :before-upload='handleBeforeUpload' list-type='picture' style='width: 300px;'>
      <Button type='primary' size='small'>点击上传</Button>
      <template #tip>
        文件上传提示
      </template>
    </upload>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Upload,
  Button,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Upload,
    Button,
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
