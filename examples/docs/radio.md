## Radio 单选框
在一组备选项中进行单选

### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。
:::demo
```html
  <template>
    <ki-radio v-model='radio' label='1'>单选框1</ki-radio>
    <ki-radio v-model='radio' label='2'>单选框2</ki-radio>
    <ki-radio v-model='radio' label='3'>单选框3</ki-radio>
  </template>

  <script>
    export default {
      data() {
        return {
          radio: '1',
        };
      },
    };
  </script>
```
:::

### 禁用状态
单选框不可用的状态。
:::demo 传递 `disabled` 属性即可，它是一个 `Boolean` 值。
```html
  <template>
    <ki-radio v-model='radio' label='1' disabled>单选框1</ki-radio>
    <ki-radio v-model='radio' label='2' disabled>单选框2</ki-radio>
    <ki-radio v-model='radio' label='3' disabled>单选框3</ki-radio>
  </template>

  <script>
    export default {
      data() {
        return {
          radio: '1',
        };
      },
    };
  </script>
```
:::

### 单选框组
适用于在多个互斥的选项中选择的场景
:::demo 结合 `ki-radio-group` 组件一起使用，在 `ki-radio-group` 绑定 `v-model`, `ki-radio` 传递 `label` 即可。
```html
  <template>
    <ki-radio-group v-model='radio'>
      <ki-radio label='1'>单选框1</ki-radio>
      <ki-radio label='2'>单选框2</ki-radio>
      <ki-radio label='3'>单选框3</ki-radio>
    </ki-radio-group>
  </template>

  <script>
    export default {
      data() {
        return {
          radio: '1',
        };
      },
    };
  </script>
```
:::

### 带边框的 Radio
:::demo 传递 `border` 属性，可以给 `ki-radio` 加上一个边框。
```html
  <template>
    <ki-radio-group v-model='radio'>
      <ki-radio v-model='radio' label='1' border>单选框1</ki-radio>
      <ki-radio v-model='radio' label='2' border>单选框2</ki-radio>
      <ki-radio v-model='radio' label='3' border>单选框3</ki-radio>
    </ki-radio-group>
  </template>

  <script>
    export default {
      data() {
        return {
          radio: '1',
        };
      },
    };
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model |	绑定值 | string / number | — | — |
| label |	Radio 的 value | string / number | — | — |
| disabled | 是否禁用 | boolean | true / false | false |
| border | 是否带有边框 | boolean | true / false | false |

### Radio Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | 绑定值变化时触发 | (value: string / number) => void |

### Radio Group Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | 绑定值变化时触发 | (value: string / number) => void |
