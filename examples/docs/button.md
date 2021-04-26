## Button
常用的操作按钮。

### 基础用法
基础的按钮用法
::: demo 使用 `type`、`round`、`circular` 和 `icon` 属性来定义 Button 的样式。
```html
  <template>
    <div>
      <ki-button>普通按钮</ki-button>
      <ki-button type='primary'>主要按钮</ki-button>
      <ki-button type='success'>成功按钮</ki-button>
      <ki-button type='warning'>警告按钮</ki-button>
      <ki-button type='error'>失败按钮</ki-button>
      <br>

      <ki-button style='margin-top: 10px;' round>普通按钮</ki-button>
      <ki-button type='primary' style='margin-top: 20px;' round>主要按钮</ki-button>
      <ki-button type='success' style='margin-top: 20px;' round>成功按钮</ki-button>
      <ki-button type='warning' style='margin-top: 20px;' round>警告按钮</ki-button>
      <ki-button type='error' style='margin-top: 20px;' round>失败按钮</ki-button>
      <br>
      
      <ki-button style='margin-top: 20px;' circular icon='info'></ki-button>
      <ki-button type='primary' style='margin-top: 20px;' circular icon='pencil'></ki-button>
      <ki-button type='success' style='margin-top: 20px;' circular icon='check'></ki-button>
      <ki-button type='warning' style='margin-top: 20px;' circular icon='warning'></ki-button>
      <ki-button type='error' style='margin-top: 20px;' circular icon='close'></ki-button>
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

### 禁用状态
按钮不可用状态
::: demo
```html
  <template>
    <ki-button disabled>普通按钮</ki-button>
    <ki-button type='primary' disabled>主要按钮</ki-button>
    <ki-button type='success' disabled>成功按钮</ki-button>
    <ki-button type='warning' disabled>警告按钮</ki-button>
    <ki-button type='error' disabled>失败按钮</ki-button>
    <br>

    <ki-button style='margin-top: 10px;' round disabled>普通按钮</ki-button>
    <ki-button type='primary' style='margin-top: 20px;' round disabled>主要按钮</ki-button>
    <ki-button type='success' style='margin-top: 20px;' round disabled>成功按钮</ki-button>
    <ki-button type='warning' style='margin-top: 20px;' round disabled>警告按钮</ki-button>
    <ki-button type='error' style='margin-top: 20px;' round disabled>失败按钮</ki-button>
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

### 图标按钮
带图标的按钮
::: demo `icon` 属性传递 [Font Awesome](http://www.fontawesome.com.cn/) 的 icon 名即可。
```html
  <template>
    <ki-button icon='info'>普通按钮</ki-button>
    <ki-button type='primary' icon='pencil'>主要按钮</ki-button>
    <ki-button type='success' icon='check'>成功按钮</ki-button>
    <ki-button type='warning' icon='warning'>警告按钮</ki-button>
    <ki-button type='error' icon='close'>失败按钮</ki-button>
    <br>

    <ki-button style='margin-top: 10px;' icon='info' round>普通按钮</ki-button>
    <ki-button type='primary' style='margin-top: 20px;' icon='pencil' round >主要按钮</ki-button>
    <ki-button type='success' style='margin-top: 20px;' icon='check' round >成功按钮</ki-button>
    <ki-button type='warning' style='margin-top: 20px;' icon='warning' round >警告按钮</ki-button>
    <ki-button type='error' style='margin-top: 20px;' icon='close' round >失败按钮</ki-button>
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

### 按钮尺寸
不同尺寸的按钮
::: demo
```html
  <template>
    <ki-button size='small'>小型按钮</ki-button>
    <ki-button size='medium'>默认按钮</ki-button>
    <ki-button size='large'>大型按钮</ki-button>
    <br>
    
    <ki-button size='small' round style='margin-top: 20px;' >小型按钮</ki-button>
    <ki-button size='medium' round style='margin-top: 20px;' >默认按钮</ki-button>
    <ki-button size='large' round style='margin-top: 20px;' >大型按钮</ki-button>
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
