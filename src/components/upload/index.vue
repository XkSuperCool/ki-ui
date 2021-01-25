<template>
  <div class='ki-upload'>
    <div @click='handleFileSelect'>
      <slot></slot>
      <input type='file' :name='name' class='ki-input-file' :multiple='multiple' ref='inputFileRef' @change='handleFileChange' />
    </div>
    <div class='ki-upload-tip'>
      <slot name='tip'></slot>
    </div>
    <ul class='ki-upload-list'>
      <li class='ki-upload-list-item' v-for='file in uploadFileList' :key='file.name'>
        <template v-if='listType === "text"'>
          <Icon type='file-text-o' />
          {{file.name}}
        </template>
        <template v-if='listType === "picture"'>
          <img src="" alt="">
          {{file.name}}
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  reactive,
} from 'vue';
import type { PropType } from 'vue';
import Icon from '../icon';

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
    listType: {
      type: String as PropType<'text' | 'picture'>,
      default: 'text',
    },
    multiple: Boolean,
    headers: Object,
    onSuccess: Function as PropType<any>,
    beforeUpload: Function,
  },
  components: {
    Icon,
  },
  setup(props) {
    let formData: FormData;
    const uploadFileList = reactive<File[]>([]);
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
      xhr.open('POST', props.action, true);
      // 设置请求头
      const headers = props.headers ?? {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(headers)) {
        if (headers[key]) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      xhr.send(formData);
      // eslint-disable-next-line consistent-return
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success', JSON.parse(xhr.responseText));
            return;
          }
          console.log('error');
        }
      };
    };

    /**
     * 将 file 类型格式化为 base64
     * */
    const fileFormatBase64 = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const dataURL = event.target?.result;
        console.log(dataURL);
      };
    };

    /**
     * change ，添加到 formData 中
     */
    // eslint-disable-next-line consistent-return
    const handleFileChange = () => {
      if (inputFileRef.value && inputFileRef?.value.files && inputFileRef?.value.files.length) {
        formData = new FormData();
        Object.values(inputFileRef.value.files).forEach((file) => {
          fileFormatBase64(file);
          formData.append(props.name, file);
          uploadFileList.push(file);
        });
        if (props.beforeUpload === undefined) {
          return handleFileUpload();
        }
        const before = props.beforeUpload();
        if (before && before.then) {
          // promise
          before.then(() => {
            handleFileUpload();
          });
        } else if (before !== false) {
          handleFileUpload();
        }
      }
    };

    return {
      inputFileRef,
      uploadFileList,
      handleFileSelect,
      handleFileChange,
    };
  },
});
</script>

<style scoped lang='less'>
 @import './style.less';
</style>
