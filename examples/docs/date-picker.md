## DatePicker 日期选择器

### 基础用法
基础的按钮用法
::: demo 使用 `type`、`round`、`circular` 和 `icon` 属性来定义 Button 的样式。
```html
  <template>
    <div>
      <date-picker />
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

### 禁用特定时间
禁用特定时间

::: demo
```html
  <template>
    <div>
      <date-picker :is-date-disabled="disabledDate"/>
    </div>
  </template>

  <script>
    export default {
      methods: {
        disabledDate(time) {
          const date = new Date(time).getDate()
          return date < 15
        }
      }
    }
  </script>
```
:::
