## Alert 警告
用于页面中展示重要的提示信息。

### 基础用法
页面中的非浮层元素，不会自动消失。

:::demo `alert` 提供四种主题 `success` 、`info` 、`warning` 、`error`。
```html
  <template>
    <ki-alert type='success'>这时一段成功信息</ki-alert>
    <ki-alert type='info' style='margin: 20px 0;'>这时一段提示信息</ki-alert>
    <ki-alert type='warning'>这时一段警告信息</ki-alert>
    <ki-alert type='error' style='margin-top: 20px;'>这时一段失败信息</ki-alert>
  </template>

  <script></script>
```
:::

### 可以关闭

:::demo `closable` 属性可以控制 `alert` 是否可以关闭，也可以使用 `close-text` 来定义关闭按钮的文本。
```html
  <template>
    <ki-alert type='success' closable>这时一段成功信息</ki-alert>
    <ki-alert type='info' style='margin: 20px 0;' closable close-text='关闭'>这时一段提示信息</ki-alert>
    <ki-alert type='warning' closable close-text='好的'>这时一段警告信息</ki-alert>
    <ki-alert type='error' style='margin-top: 20px;' closable close-text='上报'>这时一段失败信息</ki-alert>
  </template>

  <script></script>
```
:::

### 带有 icon

:::demo `icon` 属性显示不同主题图标。
```html
  <template>
    <ki-alert type='success' icon>这时一段成功信息</ki-alert>
    <ki-alert type='info' style='margin: 20px 0;' icon>这时一段提示信息</ki-alert>
    <ki-alert type='warning' icon>这时一段警告信息</ki-alert>
    <ki-alert type='error' style='margin-top: 20px;' icon>这时一段失败信息</ki-alert>
  </template>

  <script></script>
```
:::


### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| type | alert 主题类型 | string | success / info / error / warning | success |
| closable | 是否可以关闭 | boolean | false / true | false |
| closeText | 定义关闭按钮描述文本 | string | — | × |
| icon | 展示类型 icon | boolean | false / true | false |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| close | 关闭时的回调 | 	() => void |
