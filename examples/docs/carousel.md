## Carousel 走马灯
在有限空间内，循环播放同一类型的图片、文字等内容。

### 基础用法

:::demo
```html
  <template>
    <ki-carousel height='280px'>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=1' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=2' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=3' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=4' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=5' style='width: 100%; height: 100%'>
      </ki-carousel-item>
    </ki-carousel>
  </template>

  <script>
    export default {
    };
  </script>
``
:::

### 自动播放
`autoplay` 自动进行轮播。

:::demo
```html
  <template>
    <ki-carousel autoplay height='280px'>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=1' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=2' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=3' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=4' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=5' style='width: 100%; height: 100%'>
      </ki-carousel-item>
    </ki-carousel>
  </template>

  <script>
    export default {
    };
  </script>
``
:::

### 切换箭头
控制切换箭头的显示时机。

:::demo `arrow` 属性设置控制箭头的显示时机，它的选项有 `hover`、`always`、`never`。
```html
  <template>
    <ki-carousel autoplay arrow='always' height='280px'>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=1' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=2' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=3' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=4' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=5' style='width: 100%; height: 100%'>
      </ki-carousel-item>
    </ki-carousel>
  </template>

  <script>
    export default {
    };
  </script>
``
:::


### 方向
默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。

:::demo
```html
  <template>
    <ki-carousel direction='vertical' height='280px'>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=1' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=2' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=3' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=4' style='width: 100%; height: 100%'>
      </ki-carousel-item>
      <ki-carousel-item>
        <img src='https://picsum.photos/900/300?random=5' style='width: 100%; height: 100%'>
      </ki-carousel-item>
    </ki-carousel>
  </template>

  <script>
    export default {
    };
  </script>
``
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| autoplay | 是否自动播放 | boolean | true / false | false |
| height | 走马灯的高度 | string | — | 300px |
| arrow | 切换箭头的显示时机，hover: 移入显示，always: 一直显示, never: 不显示 | string | hover / always / never | hover |
| interval | 	轮播切换间隔时间（毫秒） | number | — | 3000 |
| initialIndex | 初始化时走马灯的位置 | number | — | 0 |
| direction | 走马灯方向| string | horizontal / vertical | horizontal |
