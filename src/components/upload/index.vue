<template>
  <div class='ki-upload' @click='handleFileSelect'>
    <slot></slot>
    <input type='file' :name='name' class='ki-input-file' ref='inputFileRef' @change='handleFileChange' />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
} from 'vue';

export default defineComponent({
  name: 'Upload',
  props: {
    name: {
      type: String,
      default: 'file',
    },
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let formData: FormData;
    const inputFileRef = ref<HTMLInputElement | null>(null);

    /**
     * 文件选择，使用事件冒泡触发 input 的 click 事件。
     */
    const handleFileSelect = () => {
      if (inputFileRef.value) {
        inputFileRef.value.click();
      }
    };

    /**
     * 文件上传
     * */
    const handleFileUpload = () => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = 0; // 超时时间
      xhr.open('POST', props.action);
      // 设置请求头
      xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundaryIOAbhNKakoLqjDgg');
      xhr.send(formData);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(JSON.parse(xhr.responseText));
          }
        }
      };
    };

    /**
     * change ，添加到 formData 中
     */
    const handleFileChange = () => {
      if (inputFileRef.value && inputFileRef?.value.files && inputFileRef?.value.files.length) {
        formData = new FormData();
        Object.values(inputFileRef.value.files).forEach((file) => {
          formData.append(props.name, file);
        });
        handleFileUpload();
      }
    };

    return {
      inputFileRef,
      handleFileSelect,
      handleFileChange,
    };
  },
});
</script>

<style scoped lang='less'>
 @import './style.less';
</style>
