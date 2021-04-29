## Select 选择器
当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法
适用广泛的基础单选

:::demo
```html
  <template>
    <ki-select v-model='select' style='width: 300px;'>
      <ki-option label='选项1' value='1'></ki-option>
      <ki-option label='选项2' value='2'></ki-option>
      <ki-option label='选项3' value='3'></ki-option>
      <ki-option label='选项4' value='4'></ki-option>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: '',
        };
      },
    };
  </script>
```
:::

### 禁用 Option
禁用单独的 Option，在 Option 上指定 disabled 即可。

:::demo
```html
  <template>
    <ki-select v-model='select' style='width: 300px;'>
      <ki-option label='选项1' value='1'></ki-option>
      <ki-option label='选项2' value='2' disabled></ki-option>
      <ki-option label='选项3' value='3'></ki-option>
      <ki-option label='选项4' value='4' disabled></ki-option>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: '',
        };
      },
    };
  </script>
```
:::

### 禁用状态
Select 上指定 disabled 可以将其禁用

:::demo
```html
  <template>
    <ki-select v-model='select' style='width: 300px;' disabled>
      <ki-option label='选项1' value='1'></ki-option>
      <ki-option label='选项2' value='2'></ki-option>
      <ki-option label='选项3' value='3'></ki-option>
      <ki-option label='选项4' value='4'></ki-option>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: '',
        };
      },
    };
  </script>
```
:::

### 可清空
包含清空按钮，可将选择器清空为初始状态。

:::demo 传递 `clearable` 属性，它是一个 `Boolean` 值，点击后会清空 Select。
```html
  <template>
    <ki-select v-model='select' style='width: 300px;' clearable>
      <ki-option label='选项1' value='1'></ki-option>
      <ki-option label='选项2' value='2'></ki-option>
      <ki-option label='选项3' value='3'></ki-option>
      <ki-option label='选项4' value='4'></ki-option>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: '',
        };
      },
    };
  </script>
```
:::

### 基础多选
选择多个选项，使用 Tag 展示已选项。

:::demo 传递 `multiple` 属性，开启多选。
```html
  <template>
    <ki-select v-model='select' style='width: 300px;' clearable multiple>
      <ki-option label='选项1' value='1'></ki-option>
      <ki-option label='选项2' value='2'></ki-option>
      <ki-option label='选项3' value='3'></ki-option>
      <ki-option label='选项4' value='4'></ki-option>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: [],
        };
      },
    };
  </script>
```
:::

### 分组展示
选项分组展示

:::demo 使用 `ki-option-group` 组件包裹 `ki-option` 分组展示数据。
```html
  <template>
    <ki-select v-model='select' style='width: 300px;' clearable multiple>
      <ki-option-group label='热门城市'>
        <ki-option label='北京' value='1'></ki-option>
        <ki-option label='上海' value='2'></ki-option>
        <ki-option label='广州' value='3'></ki-option>
        <ki-option label='深圳' value='4'></ki-option>
      </ki-option-group>
      <ki-option-group label='城市名'>
        <ki-option label='海南' value='5'></ki-option>
        <ki-option label='广州' value='6'></ki-option>
        <ki-option label='济南' value='7'></ki-option>
        <ki-option label='长沙' value='8'></ki-option>
      </ki-option-group>
    </ki-select>
  </template>

  <script>
    export default {
      data() {
        return {
          select: [],
        };
      },
    };
  </script>
```
:::


### Select Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | select 绑定值，指定了 `multiple` 后必须为数组 | string / number / array | — | — |
| width | 宽度 | string | — | — |
| disabled | 是否禁用 | boolean | true / false | false |
| clearable | 是否可清除 | boolean | true / false | false |
| multiple | 是否多选 | boolean | true / false | false |
| placeholder | 原生 placeholder | string | — | 请选择 |

### Select Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| change | 绑定值变化时触发 | (value: string / number / (string / number)[]) => void |
| clear | 清除后触发 | () => void |

### Option Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| value | select 绑定值 | string / number | — | — |
| label |	展示值 | string / number | — | — |
| disabled | 是否禁用 | boolean | true / false | false |

### OptionGroup Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| label | 分组名称 | string | — | — |
