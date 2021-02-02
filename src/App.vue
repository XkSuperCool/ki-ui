<template>
  <div class='app'>
    <upload
      accept='.png'
      multiple
      action='https://jsonplaceholder.typicode.com/posts/'
      list-type='picture'
      style='width: 300px;'
      :before-remove='handleBeforeRemove'
      :on-exceed='handleExceed'
      :limit='3'
      ref='uploadRef'
      :auto-upload='false'
    >
      <Button type='primary' size='small'>点击上传</Button>
      <template #tip>
        文件上传提示
      </template>
    </upload>
    <Button @click='onClick'>上传</Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Upload,
  Button,
  Message,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Upload,
    Button,
  },
  setup() {
    const appName = ref('app');
    const uploadRef = ref(null);

    const handleBeforeRemove = () => true;

    const handleExceed = (files: FileList, fileList: any) => {
      Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    };

    const onClick = () => {
      if (uploadRef.value) {
        (uploadRef.value as any).$.ctx.submit();
      }
    };

    return {
      appName,
      uploadRef,
      handleBeforeRemove,
      handleExceed,
      onClick,
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
