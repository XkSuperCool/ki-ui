## Upload 上传
通过点击或者拖拽上传文件。

### 点击上传

:::demo
```html
  <template>
    <ki-upload
      action='https://jsonplaceholder.typicode.com/posts/'
      :file-list='fileList'
      style='width: 500px'
    >
      <ki-button type='primary'>选择文件</ki-button>
    </ki-upload>
  </template>

  <script>
    export default {
      data() {
        return {
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
        };
      },
    };
  </script>
```
:::

### 图片列表缩略图
指定 `list-type=picture` 列表为缩略图模式

:::demo
```html
  <template>
    <ki-upload
      action='https://jsonplaceholder.typicode.com/posts/'
      :file-list='fileList'
      list-type='picture'
      style='width: 500px'
    >
      <ki-button type='primary'>选择文件</ki-button>
    </ki-upload>
  </template>

  <script>
    export default {
      data() {
        return {
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
        };
      },
    };
  </script>
```
:::

### 拖拽上传

:::demo `drag` 属性开启拖拽上传。
```html
  <template>
    <ki-upload
      drag
      action='https://jsonplaceholder.typicode.com/posts/'
      :file-list='fileList'
      list-type='picture'
      style='width: 500px'
    >
      <ki-icon type='cloud-upload' class='upload-icon' />
      <div class='upload-text'>将文件拖到此处，或<span>点击上传</span></div>
    </ki-upload>
  </template>

  <script>
    export default {
      data() {
        return {
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
        };
      },
    };
  </script>
```
:::

### 手动上传

:::demo `auto-upload=false` 关闭自动上传后，可以调用 `submit` 方法手动上传。
```html
  <template>
    <ki-upload
      action='https://jsonplaceholder.typicode.com/posts/'
      :file-list='fileList'
      list-type='picture'
      style='width: 400px'
      :auto-upload='false'
      ref='uploadRef'
    >
      <ki-button type='primary' style='margin-right: 10px;'>选择文件</ki-button>
      <ki-button type='success' @click='upload'>上传到服务器</ki-button>
      <template #tip>提示：这是手动上传功能哦~</template>
    </ki-upload>
  </template>

  <script>
    export default {
      data() {
        return {
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
        };
      },
      methods: {
        upload(event) {
          this.$refs.uploadRef.submit();
          event.stopPropagation();
        },
      },
    };
  </script>
```
:::

> 示例较少，但实现的功能还是蛮多的，具体看下面的属性。

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| name | 上传的文件字段名 | string | — | file |
| action | 上传的文件地址 | string | — | — |
| listType | 上传列表的展示方式 | string | text / picture | text |
| withCredentials | 支持发送 cookie 凭证信息 | boolean | false / true	| false |
| autoUpload | 选择完文件后立刻上传 | boolean | false / true	| true |
| disabled | 是否禁用 | boolean | false / true	| false |
| showFileList | 是否显示上传的文件列表 | boolean | false / true	| true |
| fileList | 	上传的文件列表，例如：[{name:"xx", url: "xx"}] | array | — | — |
| drag | 开启拖拽上传 | boolean | false / true	| false |
| multiple | 开启多选 | boolean | false / true	| false |
| limit | 限制上传文件数量 | number | — | — |
| headers |	请求头信息 | object | — | — |
| accept | 接受上传的文件类型 | string | — | — |
| onSuccess | 上传成功的回调函数 | (response: unknown, file: FileRaw, fileList: FileRaw[]) => void | — | — |
| onProgress | 上传进度回调 | (event: UploadProgressEvent, file: FileRaw, fileList: FileRaw[]) => void | — | — |
| onError | 上传失败的回调函数 | (response: unknown, file: FileRaw, fileList: FileRaw[]) => void | — | — |
| onExceed | 文件超出个数限制时的钩子 | (files: File[], fileList: FileRaw[]) => void | — | — |
| beforeUpload | 	上传前的钩子，若返回 false 或者返回 Promise 且被 reject，则停止上传，返回 true 或 resolve 则继续上传 | (file: FileRaw) => boolean / Promise<never> | — | — |
| beforeRemove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 则停止删除。 | (file: FileRaw, fileList: FileRaw[]) => boolean | — | — |

### Methods
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| submit | 手动上传 (关闭自动上传后才会起作用) | () => void |

### Slots
| name | 说明 |
| --- | ---  |
| default | 可以放置上传按钮之类的东西 |
| tip | 提示说明文字 |
