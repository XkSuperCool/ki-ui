## Checkbox 多选框
一组备选项中进行多选。

### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

:::demo 在 `ki-checkbox` 元素中定义 `v-model` 绑定变量，单一的 `checkbox` 中，默认绑定变量的值会是 `Boolean`，选中为 `true`。
```html
  <template>
    <ki-checkbox v-model='checked'>备选项</ki-checkbox>
  </template>

  <script>
    export default {
      data() {
        return {
          checked: true,
        };
      },
    }
  </script>
```
:::

### 禁用状态

:::demo 传递 `disabled` 属性将 `checkbox` 禁用。
```html
  <template>
    <ki-checkbox label='备选项' v-model='checked' disabled />
    <ki-checkbox label='备选项1' v-model='checked1' disabled />
  </template>

  <script>
    export default {
      data() {
        return {
          checked: true,
          checked1: false,
        };
      },
    }
  </script>
```
:::

### 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo 配合 `ki-checkbox-group` 组件使用，它接受一个数组类型 `v-model`，`ki-checkbox` 的 `label` 值将会作为这个数组里的值。
```html
  <template>
    <ki-checkbox-group v-model='hobby'>
      <ki-checkbox label='篮球'>篮球</ki-checkbox>
      <ki-checkbox label='跳舞'>跳舞</ki-checkbox>
      <ki-checkbox label='Rap'>Rap</ki-checkbox>
    </ki-checkbox-group>
  </template>

  <script>
    export default {
      data() {
        return {
          hobby: ['篮球'],
        };
      },
    }
  </script>
```
:::

### indeterminate 状态
indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

:::demo  `ki-checkbox` 传递 `indeterminate` 即可显示 `indeterminate` 状态效果。
```html
  <template>
    <ki-checkbox
      label='全选'
      v-model='allChecked'
      @change='handleAllChecked'
      :indeterminate='hobby.length > 0 && hobby.length !== 3'
    />
    <ki-checkbox-group v-model='hobby' style='margin-top: 10px;' @change='handleHobbyChange'>
      <ki-checkbox label='1'>篮球</ki-checkbox>
      <ki-checkbox label='2'>跳舞</ki-checkbox>
      <ki-checkbox label='3'>Rap</ki-checkbox>
    </ki-checkbox-group>
  </template>

  <script>
    export default {
      data() {
        return {
          allChecked: false,
          hobby: ['1'],
        };
      },
      methods: {
        handleAllChecked(isChecked) {
          if (isChecked) {
            this.hobby = ['1', '2', '3'];
          } else {
            this.hobby = [];
          }
        },
        handleHobbyChange(value) {
          this.allChecked = value.length === 3;
        },
      },
    }
  </script>
```
:::

### Checkbox Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | checkbox 绑定值 | string / number / boolean | — | — |
| label | 选中状态的值，在 group 下该值会被添加到 group 绑定的数组中 | string / number | — | — |
| disabled | 是否禁用 | boolean | true / false | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | true / false | false |

### Checkbox Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | 发生变化时调用 | (value: boolean) => void |


### CheckboxGroup Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | checkboxGroup 绑定值 | string[] / number[] | — | — |

### CheckboxGroup Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | 发生变化时调用 | (value: (string / number)[]) => void |
