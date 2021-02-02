<template>
  <div class='ki-upload' :class='{disabled: disabled}'>
    <div @click='handleFileSelect'>
      <DragUpload v-if='drag' :disabled='disabled' @change='handleDragChange'><slot></slot></DragUpload>
      <slot v-else></slot>
      <input type='file' :name='name' class='ki-input-file' :multiple='multiple' ref='inputFileRef' @change='handleFileChange' :accept='accept'/>
    </div>
    <div class='ki-upload-tip'>
      <slot name='tip'></slot>
    </div>
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
          <img :src='getFileImagesURL(fileRaw.raw)' :alt='fileRaw.name'>
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
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  reactive,
  Transition,
  getCurrentInstance,
} from 'vue';
import type { ComponentInternalInstance, PropType } from 'vue';
import Icon from '../icon';
import DragUpload from './drag-upload.vue';

export type UploadProgressEvent = ProgressEvent & { precent?: number };

export type UploadComponentInternalInstance = ComponentInternalInstance & {
  ctx: {
    submit: () => void;
  };
};

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
    disabled: {
      type: Boolean,
      default: false,
    },
    drag: Boolean,
    limit: Number,
    multiple: Boolean,
    headers: Object,
    accept: String,
    onSuccess: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    onProgress: Function as PropType<(event: UploadProgressEvent, file: FileRaw, fileList: FileRaw[]) => void>,
    onError: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    onExceed: Function as PropType<(files: FileList, fileList: FileRaw[]) => boolean>,
    beforeUpload: Function as PropType<(file: FileRaw) => boolean | Promise<never>>,
    beforeRemove: Function as PropType<(file: FileRaw, fileList: FileRaw[]) => boolean>,
  },
  components: {
    Icon,
    Transition,
    DragUpload,
  },
  setup(props) {
    const uploadRawFileList = reactive<FileRaw[]>([]);
    const inputFileRef = ref<HTMLInputElement | null>(null);

    /**
     * 文件选择，使用事件冒泡触发 input 的 click 事件。
     */
    const handleFileSelect = () => {
      if (inputFileRef.value && !props.disabled) {
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
              // 上传进度更新，- 0.5 是为了当服务器返回响应后在置为 100
              uploadRawFileList[index].precent = e.precent - 0.5;
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
            uploadRawFileList[index].precent = 100; // 100 为上传成功
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
      const before = props.beforeUpload(file);
      if (before && typeof before !== 'boolean' && before.then) {
        // promise
        before.then(() => {
          post(file);
        });
      } else if (before !== false) {
        post(file);
      }
    };

    /**
     * 生成 fileFileRaw 并上传
     * */
    const generateUpload = (file: File) => {
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
    };

    /**
     * change ，添加到 formData 中
     */
    // eslint-disable-next-line consistent-return
    const handleFileChange = () => {
      if (inputFileRef.value && inputFileRef?.value.files && inputFileRef?.value.files.length) {
        // limit 判断
        if (typeof props.limit === 'number' && (uploadRawFileList.length >= props.limit || inputFileRef?.value?.files.length > props.limit)) {
          if (typeof props.onExceed === 'function') {
            props.onExceed(inputFileRef?.value?.files, uploadRawFileList);
          }
          return;
        }

        Object.values(inputFileRef.value.files).forEach((file) => {
          generateUpload(file);
        });
      }
    };

    /**
     * 手动上传文件
     * */
    (getCurrentInstance() as UploadComponentInternalInstance).ctx.submit = () => {
      // 过滤没有上传的文件
      const files = uploadRawFileList.filter((fileRaw) => fileRaw.precent !== 100);
      Object.values(files).forEach((fileRaw) => {
        handleFileUpload(fileRaw);
      });
    };

    /**
     * 拖拽 change
     * */
    const handleDragChange = (file: File) => {
      generateUpload(file);
    };

    /**
     * 删除文件
     */
    const handleRemoveFile = (file: FileRaw) => {
      const index = uploadRawFileList.findIndex((item) => item.uid === file.uid);
      if (props.beforeRemove && typeof props.beforeRemove === 'function') {
        const bool = props.beforeRemove(file, uploadRawFileList);
        if (bool) {
          uploadRawFileList.splice(index, 1);
        }
      } else {
        uploadRawFileList.splice(index, 1);
      }
    };

    return {
      inputFileRef,
      uploadRawFileList,
      handleFileSelect,
      handleFileChange,
      getFileImagesURL,
      handleRemoveFile,
      handleDragChange,
    };
  },
});
</script>

<style scoped lang='less'>
 @import './style.less';
</style>
