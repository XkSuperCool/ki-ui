<template>
  <ul class='ki-upload-list'>
    <li class='ki-upload-list-item' v-for='fileRaw in uploadRawFileList' :key='fileRaw.name' :class='{picture: listType === "picture"}'>
      <template v-if='listType === "text"'>
        <Icon type='file-text-o' />
        {{fileRaw.name}}
        <div class='progress' v-if='fileRaw.precent !== 100'>
          <div class='progress-bar' :style='{width: fileRaw.precent + "%"}'></div>
          <span>{{Math.floor(fileRaw.precent)}}%</span>
        </div>
        <Transition name='fade'>
          <div class='text-icons' v-if='fileRaw.precent === 100'>
            <icon type='check-circle-o'  class='icon check-icon' />
            <icon type='times-circle-o'  class='icon close-icon' @click='handleRemoveFile(fileRaw)' />
          </div>
        </Transition>
      </template>
      <template v-if='listType === "picture"'>
        <img :src='getFileImagesURL(fileRaw)' :alt='fileRaw.name'>
        <div class='content'>
          {{fileRaw.name}}
          <div class='progress-picture' v-if='fileRaw.precent !== 100'>
            <div class='progress-bar' :style='{width: fileRaw.precent + "%"}'></div>
            <span>{{Math.floor(fileRaw.precent)}}%</span>
          </div>
        </div>
        <Transition name='fade'>
          <div class='picture-icons' v-if='fileRaw.precent === 100'>
            <icon type='check'  class='icon check-icon' />
            <icon type='close'  class='icon close-icon' @click='handleRemoveFile(fileRaw)' />
          </div>
        </Transition>
      </template>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, Transition } from 'vue';
import type { PropType } from 'vue';
import Icon from '../icon';
import { FileRaw } from './index.vue';

export default defineComponent({
  name: 'UploadList',
  props: {
    uploadRawFileList: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: String as PropType<'text' | 'picture'>,
      default: 'text',
    },
  },
  components: {
    Icon,
    Transition,
  },
  emits: ['on-remove'],
  setup(_, { emit }) {
    const getFileImagesURL = (file: FileRaw) => {
      if (file.url) {
        return file.url;
      }
      return URL.createObjectURL(file.raw);
    };
    const handleRemoveFile = (fileRaw: FileRaw) => {
      emit('on-remove', fileRaw);
    };
    return {
      getFileImagesURL,
      handleRemoveFile,
    };
  },
});
</script>

<style scoped>

</style>
