## Modal 对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 基础用法

:::demo 
```html
  <template>
    <div>
      <a @click='visible = true'>显示对话框</a>
      <ki-modal v-model='visible' title='提示' @on-ok='visible = false'>
        这时一段提示信息..
      </ki-modal>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          visible: false,
        };
      },
    }
  </script>
```
:::

### 自定义按钮文字

:::demo 使用 `cancel-text` 定义取消按钮文字，`ok-text` 定义确定按钮文字。
```html
  <template>
    <div>
      <a @click='visible = true'>显示对话框</a>
      <ki-modal v-model='visible' title='提示' @on-ok='visible = false' cancel-text='关闭' ok-text='好的'>
        这时一段提示信息..
      </ki-modal>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          visible: false,
        };
      },
    }
  </script>
```
:::

### 嵌套对话框

:::demo 使用嵌套对话框时 `teleportBody` 属性必须为 `true`。
```html
  <template>
    <div>
      <a @click='visible = true'>显示对话框</a>
      <ki-modal v-model='visible' title='提示' @on-ok='visible = false' cancel-text='关闭' ok-text='好的'>
        <a @click='visible1 = true'>显示对话框</a>
        <ki-modal v-model='visible1' title='提示' @on-ok='visible1 = false' offset='10%'>
          嵌套对话框
        </ki-modal>
      </ki-modal>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          visible: false,
          visible1: false,
        };
      },
    }
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | 显隐绑定值 | boolean | — | — |
| title | 对话框左上角的标题 | string | — | — |
| width | 对话框宽度 | string | — | 40% |
| offset | 对话框距离顶部的偏移 | string | — | 20% |
| cancelText | 取消按钮自定义描述文字 | string |  — | 取消 |
| okText | 确定按钮自定义描述文字 | string |  — |	确定 |
| closeOnPressEscape | 按下 ESC 键是否可以关闭 | boolean | false / true | false |
| teleportBody | 是否添加到 Body 上 | boolean | false / true | true |
| mask | 是否显示背景蒙层 | boolean | false / true | true |
| showClose | 是否显示右上角关闭按钮 | boolean | false / true | true |
| beforeClose | 弹出框关闭前的回调，接受一个 done 的函数，手动调用即可关闭 | (done: () => void) => void | — | — |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| open | 打开弹出框时的回调 | () => void |
| close | 关闭弹出框时的回调 | () => void |
| on-cancel | 点击取消按钮时的回调 | () => void |
| on-ok | 点击确定按钮时的回调 | () => void |
