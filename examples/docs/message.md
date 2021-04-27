## Message 消息提示
常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 基础用法
从顶部出现，3 秒后自动消失。

:::demo
```html
  <template>
    <ki-button @click='click'>弹出消息提示</ki-button>
  </template>

  <script>
    export default {
      methods: {
        click() {
          this.$message.info('消息提示');
        },
      },
    }
  </script>
```
:::

### 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。

:::demo 调用 `message` 不同方法即可。
```html
  <template>
    <ki-button @click='click("success")'>成功</ki-button>
    <ki-button @click='click("error")'>失败</ki-button>
    <ki-button @click='click("info")'>消息</ki-button>
    <ki-button @click='click("warning")'>警告</ki-button>
  </template>

  <script>
    export default {
      methods: {
        click(method) {
          this.$message[method](`${method} 提示`);
        },
      },
    }
  </script>
```
:::

### 设置时间
`delay` 设置消失的时间，如果是 -1 则不会消失。

:::demo 调用 `message` 不同方法即可。
```html
  <template>
    <ki-button @click='click'>不会关闭</ki-button>
    <ki-button @click='close' type='warning' size='small'>手动关闭</ki-button>
    <ki-button @click='click1'>10s 后关闭</ki-button>
  </template>

  <script>
    let hide;
    export default {
      methods: {
        click() {
          hide = this.$message.warning({
            content: '这是一个不会关闭的提示',
            delay: -1,
          });
        },
        close() {
          if (hide) {
            hide();
          }
        },
        click1() {
          this.$message.warning({
            content: '10s 后关闭',
            delay: 10000,
          });
        },
      },
    }
  </script>
```
:::

### 显示 icon
:::demo 设置 `showIcon: true` 显示 `icon` 图标。
```html
  <template>
    <ki-button @click='click("success")'>成功</ki-button>
    <ki-button @click='click("error")'>失败</ki-button>
    <ki-button @click='click("info")'>消息</ki-button>
    <ki-button @click='click("warning")'>警告</ki-button>
  </template>

  <script>
    export default {
      methods: {
        click(method) {
          this.$message[method]({
            content: `${method} 提示`,
            showIcon: true,
          });
        },
      },
    }
  </script>
```
:::

### Options
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| content | 消息内容 | string | — | — |
| delay | 消失时间（毫秒）| number | — | 3000 |
| showIcon | 是否显示 icon 图标 | boolean | false / true | false |
| offset | 顶部偏移值 | number | — | 20 |
