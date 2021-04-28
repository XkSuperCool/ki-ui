## MessageBox 弹框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

### 消息提示
当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

:::demo
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.alert('这里是内容区域..', {
            confirmButtonText: '知道了',
            callback: (action) => {
              this.$message.success(`消息提示: ${action}`);
            },
          })
        },
      },
    };
  </script>
```
:::

### 确认消息
提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

:::demo `confirm` 模拟了系统的 `confirm`, 它有一个 `iconType` 属性，可以展示 `confirm` 的不同状态，同时示例中还使用 `Promise` 来处理用户的确认和取消。
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
            iconType: 'warning',
          }).then(() => {
            this.$message.success('ok');
          }).catch(() => {
            this.$message.warning('cancel');
          });
        },
      },
    };
  </script>
```
:::

### 提交内容
当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

:::demo `prompt` 模拟了系统的 `prompt`, 它可以接收到用户输入的内容，同时还可以通过 `inputPattern` 属性对内容进行校验。
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.prompt('请输入邮箱', {
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '请输入正确的邮箱号',
            inputPlaceholder: '请输入邮箱',
          }).then((value) => {
            this.$message.success(`您的邮箱是: ${value}`);
          }).catch(() => {
            this.$message.warning('cancel');
          });
        },
      },
    };
  </script>
```
:::

### 局中布局
内容支持居中布局

:::demo 设置 `center` 属性可以使内容局中。
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
            iconType: 'warning',
            center: true,
            mask: false,
          }).then(() => {
            this.$message.success('ok');
          }).catch(() => {
            this.$message.warning('cancel');
          });
        },
      },
    };
  </script>
```
:::

### HTML 片段
message 属性支持传入 HTML 片段。


:::demo 设置 `dangerouslyUseHTMLString` 属性后 `message` 属性就可以传递 `HTML` 片段。
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.alert('<i>这是一个 <span style="color: orange;">HTML</span> 片段</i>', 'HTML 片段', {
            dangerouslyUseHTMLString: true,
          }).then(() => {
            this.$message.success('ok');
          }).catch(() => {
            this.$message.warning('cancel');
          });
        },
      },
    };
  </script>
```
:::

### 区分取消与关闭
有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。

:::demo 设置 `distinguishCancelAndClose` 可以区分点击的是取消按钮还是关闭按钮。
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
            iconType: 'warning',
            distinguishCancelAndClose: true,
          }).then(() => {
            this.$message.success({
              content: '保存修改',
            });
          }).catch((action) => {
            this.$message.info(action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面');
          });
        },
      },
    };
  </script>
```
:::

### 关闭前的回调
指定 `beforeClose` 后可以手动关闭 `message box`，它接受一个 `callback` 调用后即可关闭, 如果点击的是确认按钮还会有一个 `loading` 效果。

:::demo
```html
  <template>
    <a @click='open'>点击打开 Message Box</a>
  </template>

  <script>
    export default {
      methods: {
        open() {
          this.$messageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
            iconType: 'warning',
            beforeClose(done, action) {
              if (action === 'confirm') {
                setTimeout(done, 2000);
              } else {
                done();
              }
            },
          }).then(() => {
            this.$message.success('文件删除成功！');
          }).catch(() => {
            this.$message.warning('取消删除文件！');
          });
        },
      },
    };
  </script>
```
:::

### MessageBox 方法
MessageBox 会在 Vue.prototype 上添加四个方法：$messageBox、$messageBox.alert、$messageBox.confirm、$messageBox.prompt，它们的调用参数为：
  * `$messageBox(options)`
  * `$messageBox.alert(message, title, [,options])`
  * `$messageBox.confirm(message, title, [,options])`
  * `$messageBox.prompt(message, title, [,options])`

### Options
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| type | 弹框类型 | string | alert / confirm / prompt | — |
| title | 提示标题 | string | — | — |
| message | 提示内容信息 | string | — | — |
| center | 是否局中布局 | boolean | true / false | false |
| iconType | icon 类型 | string | success / info / error / warning | — |
| mask | 是否显示遮罩层 | boolean | true / false | true |
| lockScroll | 是否在 MessageBox 出现时将 body 滚动锁定 | boolean | true / false | true |
| inputPattern | prompt 输入框的校验正则 | RegExp | — | — |
| inputErrorMessage | 校验失败的提示信息 | string | — | 输入的数据不合法！ |
| inputPlaceholder | 输入框的 placeholder | string | — | — |
| inputType | prompt 使用的 input 类型 | string | text / password / textarea | text |
| inputValue | prompt 使用的 input 初始值 | string | — | — |
| closeOnClickModal | 点击遮罩层是否可以关闭 MessageBox | boolean | true / false | true |
| showCancelButton | 是否显示 cancel 按钮 | boolean | true / false | 默认在 type 不是 alert 时为 true |
| showConfirmButton | 是否显示 confirm 按钮 | boolean | true / false | true |
| cancelButtonText | 取消按钮文字 | string | — | 取消 |
| confirmButtonText | 确定按钮文字 | string | — | 确定 |
| closeOnHashChange | 是否在 hashchange 时关闭 MessageBox | boolean | true / false | 默认在 type 不是 alert 时为 true |
| dangerouslyUseHTMLString | message 是否支持 HTML 片段 | boolean | true / false | false |
| distinguishCancelAndClose | 是否区分取消触发和关闭触发 | boolean | true / false | false |
| callback | 点击按钮的回调 | (action: Action, value: string) => void | — | — |
| beforeClose | 关闭 MessageBox 前的回调(需要手动调用 done 函数) | (done: () => void, action: Action) => void | — | — |

### Action 类型
  * `confirm` 点击确认按钮
  * `cancel` 点击取消按钮
  * `close` 点击关闭按钮，也就是右上角的叉叉（只有在 `distinguishCancelAndClose = true` 才会出现 `close`）