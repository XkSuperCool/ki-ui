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
      <li class='ki-upload-list-item' v-for='fileRaw in uploadRawFileList' :key='fileRaw.name' :class='{picture: listType === "picture"}'>
        <template v-if='listType === "text"'>
          <Icon type='file-text-o' />
          {{fileRaw.name}}
          <div class='progress' :style='{width: fileRaw.precent + "%"}' v-if='fileRaw.precent !== 100'></div>
        </template>
        <template v-if='listType === "picture"'>
          <img :src='getFileImagesURL(fileRaw.raw)' :alt='fileRaw.name'>
          <div class='content'>
            {{fileRaw.name}}
            <div class='progress' :style='{width: fileRaw.precent + "%"}' v-if='fileRaw.precent !== 100'>
            </div>
          </div>
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

export type UploadProgressEvent = ProgressEvent & { precent?: number };

export interface FileRaw {
  raw: File;
  uid: number;
  precent: number;
  size: number;
  name: string;
}

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
    withCredentials: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    multiple: Boolean,
    headers: Object,
    onSuccess: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    onProgress: Function as PropType<(event: UploadProgressEvent, file: FileRaw, fileList: FileRaw[]) => void>,
    onError: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    beforeUpload: Function,
  },
  components: {
    Icon,
  },
  setup(props) {
    const uploadRawFileList = reactive<FileRaw[]>([]);
    const inputFileRef = ref<HTMLInputElement | null>(null);

    /**
     * 文件选择，使用事件冒泡触发 input 的 click 事件。
     */
    const handleFileSelect = () => {
      if (inputFileRef.value) {
        /**
         * 置空解决 input=file 不能重复上传同一个文件的问题
         * */
        inputFileRef.value.value = '';
        inputFileRef.value.click();
      }
    };

    /**
     * 发送 post 请求
     * */
    const post = (fileRaw: FileRaw) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = 0; // 超时时间
      xhr.withCredentials = props.withCredentials;
      const index = uploadRawFileList.findIndex((item) => item.uid === fileRaw.uid);
      if (xhr.upload) {
        xhr.upload.onprogress = function onprogress(e: UploadProgressEvent) {
          if (e.total > 0) {
            // eslint-disable-next-line no-mixed-operators
            e.precent = e.loaded / e.total * 100;
            if (index !== -1) {
              // 上传进度更新
              uploadRawFileList[index].precent = e.precent;
            }
          }
          if (props.onProgress) {
            props.onProgress(e, fileRaw, uploadRawFileList);
          }
        };
      }
      xhr.open('POST', props.action, true);
      // 设置请求头
      const headers = props.headers ?? {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(headers)) {
        if (headers[key]) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      const formData = new FormData();
      formData.append(props.name, fileRaw.raw);
      xhr.send(formData);
      // eslint-disable-next-line consistent-return
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (props.onSuccess) {
              const response = JSON.parse(xhr.responseText);
              props.onSuccess(response, fileRaw, uploadRawFileList);
            }
            return;
          }
          if (index !== -1) {
            uploadRawFileList.splice(index, 1);
          }
          if (props.onError) {
            const response = JSON.parse(xhr.responseText);
            props.onError(response, fileRaw, uploadRawFileList);
          }
        }
      };
    };

    /**
     * 获取 File URL
     * */
    const getFileImagesURL = (file: File) => URL.createObjectURL(file);

    /**
     * 文件上传
     * */
    // eslint-disable-next-line consistent-return
    const handleFileUpload = (file: FileRaw) => {
      if (props.beforeUpload === undefined) {
        return post(file);
      }
      const before = props.beforeUpload();
      if (before && before.then) {
        // promise
        before.then(() => {
          post(file);
        });
      } else if (before !== false) {
        post(file);
      }
    };

    /**
     * change ，添加到 formData 中
     */
    // eslint-disable-next-line consistent-return
    const handleFileChange = () => {
      if (inputFileRef.value && inputFileRef?.value.files && inputFileRef?.value.files.length) {
        Object.values(inputFileRef.value.files).forEach((file) => {
          const fileRaw: FileRaw = {
            raw: file,
            uid: Date.now(),
            precent: 0,
            size: file.size,
            name: file.name,
          };
          uploadRawFileList.push(fileRaw);
          if (props.autoUpload) {
            handleFileUpload(fileRaw);
          }
        });
      }
    };

    return {
      inputFileRef,
      uploadRawFileList,
      handleFileSelect,
      handleFileChange,
      getFileImagesURL,
    };
  },
});
</script>

<style scoped lang='less'>
 @import './style.less';
</style>
