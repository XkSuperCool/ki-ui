## ImgPreview
一个图片预览组件。

### 基础用法

:::demo 
```html
  <template>
    <ki-button @click='show'>查看</ki-button>
  </template>

  <script>
    export default {
      data() {
        return {
          imgs: ['https://picsum.photos/1000/600'],
        };
      },
      methods: {
        show() {
          
        },
      },
    };
  </script>
```
:::
