<template>
  <div>
    <Container
      title='点击上传'
    >
      <KiUpload
        action='https://jsonplaceholder.typicode.com/posts/'
        :file-list='fileList'
      >
        <ki-button type='primary'>选择文件</ki-button>
      </KiUpload>
    </Container>
    <Container
      title='图片列表缩略图'
      sub-title='指定 list-type=picture 列表为缩略图模式'
    >
      <KiUpload
        action='https://jsonplaceholder.typicode.com/posts/'
        :file-list='fileList2'
        list-type='picture'
      >
        <ki-button type='primary'>选择文件</ki-button>
      </KiUpload>
    </Container>
    <Container
      title='拖动上传'
      sub-title='drag 为 true 时开启拖动上传'
    >
      <KiUpload
        action='https://jsonplaceholder.typicode.com/posts/'
        :file-list='fileList3'
        list-type='picture'
        drag
        style='width: 400px'
      >
        <Icon type='cloud-upload' class='upload-icon' />
        <div class='upload-text'>将文件拖到此处，或<span>点击上传</span></div>
      </KiUpload>
    </Container>
    <Container
      title='手动上传'
      sub-title='auto-upload = false 后调用 upload 的 submit 方法，实现手动上传'
    >
      <KiUpload
        action='https://jsonplaceholder.typicode.com/posts/'
        :file-list='fileList3'
        list-type='picture'
        style='width: 400px'
        :auto-upload='false'
        ref='uploadRef'
      >
        <ki-button type='primary' style='margin-right: 10px;'>选择文件</ki-button>
        <ki-button type='success' @click.stop='upload'>上传到服务器</ki-button>
        <template #tip>上传到服务器按钮需要使用 .stop 修饰符哦~</template>
      </KiUpload>
    </Container>
    <p class='tip'>注：示例比较少但是已经实现了 ElementUI Upload 组件的大部分功能，详情看下面的属性</p>
    <Attribute :attributes='attributes' />
    <Attribute :attributes='events' target='event' title='Events' />
    <Attribute :attributes='slots' target='slot' title='Slots' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Upload, Button, Icon } from '@/components';
import Container from './component/container.vue';
import Attribute from './component/attributes.vue';

export default defineComponent({
  name: 'UploadExample',
  components: {
    KiUpload: Upload,
    KiButton: Button,
    Container,
    Icon,
    Attribute,
  },
  setup() {
    const uploadRef = ref<any | null>(null);

    const upload = () => {
      if (uploadRef.value) {
        (uploadRef.value as any).$.ctx.submit();
      }
    };

    const attributes = [
      {
        attribute: 'name',
        description: '上传的文件字段名',
        type: 'string',
        option: '——',
        default: 'file',
      },
      {
        attribute: 'action',
        description: '上传的文件地址',
        type: 'string',
        option: '——',
        default: '——',
      },
      {
        attribute: 'listType',
        description: '上传列表的展示方式',
        type: 'string',
        option: 'text | picture',
        default: 'text',
      },
      {
        attribute: 'withCredentials',
        description: '支持发送 cookie 凭证信息',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'autoUpload',
        description: '选择完文件后立刻上传',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'showFileList',
        description: '是否显示上传的文件列表',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'fileList',
        description: '上传的文件列表，例如：[{name:"xx", url: "xx"}]',
        type: 'array',
        option: '——',
        default: '——',
      },
      {
        attribute: 'drag',
        description: '开启拖拽上传',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'multiple',
        description: '开启多选',
        type: 'boolean',
        option: 'false | true',
        default: 'false',
      },
      {
        attribute: 'limit',
        description: '限制上传文件数量',
        type: 'number',
        option: '——',
        default: '——',
      },
      {
        attribute: 'headers',
        description: '请求头信息',
        type: 'object',
        option: '——',
        default: '——',
      },
      {
        attribute: 'accept',
        description: '接受上传的文件类型',
        type: 'string',
        option: '——',
        default: '——',
      },
      {
        attribute: 'onSuccess',
        description: '上传成功的回调函数',
        type: '(response: unknown, file: FileRaw, fileList: FileRaw[]) => void',
        option: '——',
        default: '——',
      },
      {
        attribute: 'onProgress',
        description: '上传进度回调',
        type: '(event: UploadProgressEvent, file: FileRaw, fileList: FileRaw[]) => void',
        option: '——',
        default: '——',
      },
      {
        attribute: 'onError',
        description: '上传失败的回调函数',
        type: '(response: unknown, file: FileRaw, fileList: FileRaw[]) => void',
        option: '——',
        default: '——',
      },
      {
        attribute: 'onExceed',
        description: '文件超出个数限制时的钩子',
        type: '(files: File[], fileList: FileRaw[]) => void',
        option: '——',
        default: '——',
      },
      {
        attribute: 'beforeUpload',
        description: '上传前的钩子，若返回 false 或者返回 Promise 且被 reject，则停止上传，返回 true 或 resolve 则继续上传',
        type: '(file: FileRaw) => boolean | Promise<never>',
        option: '——',
        default: '——',
      },
      {
        attribute: 'beforeRemove',
        description: '删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 则停止删除。',
        type: '(file: FileRaw, fileList: FileRaw[]) => boolean',
        option: '——',
        default: '——',
      },
    ];

    return {
      uploadRef,
      upload,
      attributes,
      fileList: [
        {
          name: '随机图片1',
          url: 'https://picsum.photos/200/300?random=1',
        },
        {
          name: '随机图片2',
          url: 'https://picsum.photos/200/300?random=2',
        },
      ],
      fileList2: [
        {
          name: '随机图片1',
          url: 'https://picsum.photos/200/300?random=1',
        },
        {
          name: '随机图片2',
          url: 'https://picsum.photos/200/300?random=2',
        },
      ],
      fileList3: [
        {
          name: '随机图片1',
          url: 'https://picsum.photos/200/300?random=1',
        },
        {
          name: '随机图片2',
          url: 'https://picsum.photos/200/300?random=2',
        },
      ],
      events: [
        {
          name: 'submit',
          description: '手动上传',
          type: '() => void',
        },
      ],
      slots: [
        {
          name: 'default',
          description: '可以防止上传按钮之类的东东',
        },
        {
          name: 'tip',
          description: '提示说明文字',
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
  .tip {
    color: var(--primary-color);
    font-size: 14px;
    margin: 20px 0;
  }
</style>
