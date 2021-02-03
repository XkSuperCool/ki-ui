<template>
  <div class='app'>
    <upload
      drag
      accept='.png'
      multiple
      action='https://jsonplaceholder.typicode.com/posts/'
      list-type='picture'
      style='width: 300px;'
      :before-remove='handleBeforeRemove'
      :on-exceed='handleExceed'
      :limit='3'
      :file-list='fileList'
    >
      <div class='upload-icon'><Icon type='cloud-upload' /></div>
      <div class='upload-text'>将文件拖拽到此处，或<span>点击上传</span></div>
      <template #tip>
        只能上传 .png 类型图片，最多可以上传三张!
      </template>
    </upload>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Upload,
  Icon,
  Message,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Upload,
    Icon,
  },
  setup() {
    const appName = ref('app');

    const handleBeforeRemove = () => true;

    const handleExceed = (files: FileList, fileList: any) => {
      Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    };

    const fileList = ref([
      {
        name: 'random1.jpg',
        url: 'https://picsum.photos/200/300?random=1',
      },
      {
        name: 'random2.jpg',
        url: 'https://picsum.photos/200/300?random=2',
      },
    ]);

    return {
      appName,
      handleBeforeRemove,
      handleExceed,
      fileList,
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
