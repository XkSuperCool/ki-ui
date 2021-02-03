<template>
  <div class='ki-upload' :class='{disabled: disabled}'>
    <div @click='handleFileSelect'>
      <DragUpload v-if='drag' :disabled='disabled' @change='handleDragChange'>
        <slot></slot>
      </DragUpload>
      <slot v-else></slot>
      <input type='file' :name='name' class='ki-input-file' :multiple='multiple' ref='inputFileRef' @change='handleFileChange' :accept='accept'/>
    </div>
    <div class='ki-upload-tip'>
      <slot name='tip'></slot>
    </div>
    <UploadList
      v-if='showFileList'
      :list-type='listType'
      :upload-raw-file-list='uploadRawFileList'
      @on-remove='handleRemoveFile'
    />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
} from 'vue';
import type { ComponentInternalInstance, PropType } from 'vue';
import DragUpload from './drag-upload.vue';
import UploadList from './upload-list.vue';

export type UploadProgressEvent = ProgressEvent & { precent?: number };

export type UploadComponentInternalInstance = ComponentInternalInstance & {
  ctx: {
    submit: () => void;
  };
};

export interface FileRaw {
  name: string;
  precent: number;
  uid?: number;
  raw?: File;
  size?: number;
  url?: string;
}

export interface FileListItem {
  name: string;
  url: string;
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
    showFileList: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array as PropType<FileListItem[]>,
      default: () => [],
    },
    drag: Boolean,
    limit: Number,
    multiple: Boolean,
    headers: Object,
    accept: String,
    onSuccess: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    onProgress: Function as PropType<(event: UploadProgressEvent, file: FileRaw, fileList: FileRaw[]) => void>,
    onError: Function as PropType<(response: unknown, file: FileRaw, fileList: FileRaw[]) => void>,
    onExceed: Function as PropType<(files: File[], fileList: FileRaw[]) => boolean>,
    beforeUpload: Function as PropType<(file: FileRaw) => boolean | Promise<never>>,
    beforeRemove: Function as PropType<(file: FileRaw, fileList: FileRaw[]) => boolean>,
  },
  components: {
    DragUpload,
    UploadList,
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
      if (!fileRaw.raw) {
        return;
      }
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
            props.onExceed(Array.from(inputFileRef?.value?.files), uploadRawFileList);
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
      if (typeof props.limit === 'number' && uploadRawFileList.length >= props.limit) {
        if (typeof props.onExceed === 'function') {
          props.onExceed([file], uploadRawFileList);
        }
        return;
      }
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

    onMounted(() => {
      props.fileList.forEach((file) => {
        uploadRawFileList.push({
          ...file,
          precent: 100,
        });
      });
    });

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
