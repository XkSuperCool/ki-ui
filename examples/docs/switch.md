## Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法
:::demo
```html
  <template>
    <ki-switch
      v-model='value'
      active-color='#13ce66'
      inactive-color='#ff4949'
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: false,
        };
      },
    };
  </script>
```
:::

### 文字描述

:::demo
```html
  <template>
    <ki-switch
      v-model='value'
      active-text='按月付费'
      inactive-text='按年付费'
    />
    <br />
    <br />
    <ki-switch
      v-model='value1'
      active-color='#13ce66'
      inactive-color='#ff4949'
      active-text='按月付费'
      inactive-text='按年付费'
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: true,
          value1: true,
        };
      },
    };
  </script>
```
:::

### 设置扩展的 Value 类型

:::demo 设置 `active-value` 、`inactive-value` 属性自定义开关绑定值，支持 `string`、`number`、`boolean` 类型。
```html
  <template>
    <p>value: {{value}}</p>
    <ki-switch
      v-model='value'
      active-color='#13ce66'
      inactive-color='#ff4949'
      active-value='100'
      inactive-value='0'
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: '0',
        };
      },
    };
  </script>
```
:::

### 禁用状态

:::demo 设置 `disabled` 属性为 `true` 即可将其禁用。
```html
  <template>
    <ki-switch
      v-model='value'
      disabled
    />
    <br/>
    <ki-switch
      v-model='value1'
      disabled
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: false,
          value1: true,
        };
      },
    };
  </script>
```
:::

### 阻止切换

:::demo 设置 `beforeChange` 属性当其返回 `false` 或 `Promise` 状态为 `reject` 时停止切换。
```html
  <template>
    <ki-switch
      v-model='value'
      :before-change='beforeChange'
    />
    <br />
    <ki-switch
      v-model='value1'
      :before-change='beforeChange1'
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: false,
          value1: true,
        };
      },
      methods: {
        beforeChange() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          });
        },
        beforeChange1() {
          return new Promise((_, reject) => {
            setTimeout(() => {
              reject();
              this.$message.error('切换状态失败');
            }, 3000);
          });
        },
      },
    };
  </script>
```
:::

### 自定义宽度

:::demo 通过 `width` 属性可以设置开关的宽度（px），开关的高度会跟着宽度发生变化。
```html
  <template>
    <ki-switch
      :width='100'
      v-model='value'
      active-color='#13ce66'
      inactive-color='#ff4949'
    />
  </template>
  
  <script>
    export default {
      data() {
        return {
          value: false,
        };
      },
    };
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | switch 绑定值 | string / number / boolean | — | — |
| width | switch 的宽度（px） | number | — | 40 |
| disabled | 是否禁用 | boolean | true / false | false |
| activeColor | switch 打开时的背景色 | string | — | #1890ff |
| inactiveColor | switch 关闭时的背景颜色 | string | — | #d9d9d9 |
| activeText | switch 打开时的文字描述 | string | — | — |
| inactiveText | switch 关闭时的文字描述 | string | — | — |
| activeValue | switch 打开时绑定的值 | string / number / boolean | — | — | 
| inactiveValue | switch 关闭时绑定的值 | string / number / boolean | — | — |
| beforeChange | switch 关闭时的回调，返回 false 或 Promise 的状态为 reject 则停止关闭 | () => boolean / Promise<void> | — | — |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | switch 状态改变时调用 | 	(value: number / string / boolean) => void |

