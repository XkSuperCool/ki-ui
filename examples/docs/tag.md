## Tag 标签
用于标记和选择。

### 基础用法
::: demo 由 `type` 属性来选择 tag 的类型。
```html
  <template>
    <div>
      <ki-tag style='margin-right: 20px;'>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' type='success'>标签二</ki-tag>
      <ki-tag style='margin-right: 20px;' type='info'>标签三</ki-tag>
      <ki-tag style='margin-right: 20px;' type='warning'>标签四</ki-tag>
      <ki-tag style='margin-right: 20px;' type='error'>标签五</ki-tag>
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 可移除标签
::: demo 设置 `closable` 可以控制一个标签是否可以被移除掉，它是一个 `boolean` 值。
```html
  <template>
    <div>
      <ki-tag style='margin-right: 20px;' closable>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' type='success' closable>标签二</ki-tag>
      <ki-tag style='margin-right: 20px;' type='info' closable>标签三</ki-tag>
      <ki-tag style='margin-right: 20px;' type='warning' closable>标签四</ki-tag>
      <ki-tag style='margin-right: 20px;' type='error' closable>标签五</ki-tag>
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 不同尺寸
Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
::: demo 通过 `size` 属性可以设置 tag 的大小, 可选值有 `mini` 、`small` 、`medium`、`large`。
```html
  <template>
    <div>
      <ki-tag style='margin-right: 20px;' closable size='mini'>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' closable size='small'>标签二</ki-tag>
      <ki-tag style='margin-right: 20px;' closable size='medium'>标签三</ki-tag>
      <ki-tag style='margin-right: 20px;' closable size='large'>标签四</ki-tag>
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 自定义颜色
自定义 tag 的颜色。
::: demo 通过 `color` 定义 tag 的背景颜色，`font-color` 定义字体颜色。
```html
  <template>
    <div>
      <ki-tag style='margin-right: 20px;' color='red'>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' color='blue'>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' color='yellow' font-color='#000'>标签一</ki-tag>
      <ki-tag style='margin-right: 20px;' color='pink' font-color='#000'>标签一</ki-tag>
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| type | Tag 类型 | string | primary / small / error / warning / info | primary |
| size | Tag 尺寸 | string | mini / success / medium / large | medium |
| closable | 是否可移除 | boolean |	true / false | false |
| color | 自定义背景颜色 | string | — | — |
| font-color | 自定义字体颜色（需配合 color 一起使用） | string | — | — |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| on-close | 移除 Tag 时触发 | 	() => void |
