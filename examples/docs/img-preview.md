## ImgPreview
一个图片预览组件。

### 基础用法
点击预览大图。

:::demo
```html
  <template>
      <ki-img-preview :imgs='imgs' />
  </template>
  
  <script>
      export default {
        data() {
          return {
            imgs: [
              'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
            ],
          };
        },
      };
  </script>
```
:::

### API 调用预览
调用 `API` 的方式进行图片预览。

:::demo 调用 `$ImgPreview` 方法并传递一个 `url` 数组即可实现图片的预览，它的第二个参数 `index` 是指初始要显示的图片。
```html
  <template>
    <ki-button @click='show' size='small' type='primary'>
      预览图片
    </ki-button>
  </template>

  <script>
    export default {
      data() {
        return {
          imgs: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
          ],
        };
      },
      methods: {
        show() {
          this.$ImgPreview.show(this.imgs);
        },
      },
    };
  </script>
```
:::
