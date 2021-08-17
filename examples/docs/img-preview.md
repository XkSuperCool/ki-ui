## ImgPreview
一个图片预览组件。

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
          imgs: ['https://picsum.photos/id/236/1000/600', 'https://picsum.photos/id/237/600/400'],
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
