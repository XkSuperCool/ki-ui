## Input 输入框
通过鼠标或键盘输入字符

### 基础用法
:::demo
```html
  <template>
    <ki-input v-model='text' style='width: 300px'/>
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
        };
      },
    };
  </script>
```
:::

### 禁用状态
:::demo 通过 `disabled` 属性禁用 `input`。
```html
  <template>
    <ki-input v-model='text' style='width: 300px' disabled />
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
        };
      },
    };
  </script>
```
:::

### 可清空输入框
:::demo 通过 `clearable` 获取一个可以清空的输入框。
```html
  <template>
    <ki-input v-model='text' style='width: 300px' clearable />
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
        };
      },
    };
  </script>
```
:::

### 密码框
:::demo 设置 `type = password` 可以得到一个密码输入框，还有一个 `show-password` 属性可以控制密码的显隐，它是一个 `Boolean` 值。
```html
  <template>
    <ki-input v-model='password' style='width: 300px' type='password' show-password />
  </template>

  <script>
    export default {
      data() {
        return {
          password: '',
        };
      },
    };
  </script>
```
:::

### 带 icon 的输入框
带有图标标记输入类型

:::demo 可以通过 `prefix-icon` 、`suffix-icon` 属性 / slot 来在输入框的首 / 尾部添加图标
```html
  <template>
    <div>
      <span>属性方式：</span>
      <ki-input v-model='value1' style='width: 300px; margin: 0 20px;' prefix-icon='user-circle-o' />
      <ki-input v-model='value2' style='width: 300px' suffix-icon='laptop' />
    </div>
    <div style='margin-top: 20px;'>
      <span>slot 方式：</span>
      <ki-input v-model='value3' style='width: 300px; margin: 0 20px;'>
        <template #prefix-icon>
          <ki-icon type='user-circle-o' #prefix-icon />
        </template>
      </ki-input>
      <ki-input v-model='value2' style='width: 300px' suffix-icon='laptop' />
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          value1: '',
          value2: '',
          value3: '',
          value4: '',
        };
      },
    };
  </script>
```
:::

### 文本域
用于输入多行文本信息，通过将 `type` 属性的值指定为 `textarea`。

:::demo
```html
  <template>
    <ki-input v-model='text' style='width: 300px' type='textarea' />
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
        };
      },
    };
  </script>
```
:::

### 复合性输入框
可前置或后置元素，一般为标签或按钮。

:::demo
```html
  <template>
    <ki-input v-model='value1' style='width: 400px'>
      <template #append>
        <ki-icon type='search' />
      </template>
    </ki-input>
    <br/>
    <ki-input v-model='value2' style='width: 400px; margin: 20px 0;'>
      <template #prepend>
        .com
      </template>
    </ki-input>
    <br/>
    <ki-input v-model='value3' style='width: 400px;'>
      <template #append>
        https://
      </template>
      <template #prepend>
        .com
      </template>
    </ki-input>
  </template>

  <script>
    export default {
      data() {
        return {
          value1: '',
          value2: '',
          value3: '',
        };
      },
    };
  </script>
```
:::

### 输入长度限制

:::demo `max-length` 和 `min-length` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 的输入框，在使用 `max-length` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。
```html
  <template>
    <ki-input v-model='text' style='width: 400px' :min-length='0' :max-length='10' show-word-limit />
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
          text1: '',
        };
      },
    };
  </script>
```
:::

### 不同尺寸
通过 `size` 属性控制输入框的尺寸。

:::demo
```html
  <template>
    <ki-input style='width: 230px; margin-right: 10px;' v-model='text' size='mini' />
    <ki-input style='width: 230px; margin-right: 10px;' v-model='text' size='small' />
    <ki-input style='width: 230px; margin-right: 10px;' v-model='text' size='medium' />
    <ki-input style='width: 230px; margin-right: 10px;' v-model='text' size='large' />
  </template>

  <script>
    export default {
      data() {
        return {
          text: '',
        };
      },
    };
  </script>
```
:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| v-model | 输入框绑定值 | string | — | — |
| type | 输入框类型 | string | text / password / textarea | text |
| row | textarea 的 row | number | — | 2 |
| size | 输入框大小 | string | small / medium / large / mini | medium |
| disabled | 是否禁用 | boolean | true / false | false |
| clearable | 是否可清空 | boolean | true / false | false |
| suffixIcon | 	输入框后置 icon name | string | Font Awesome 有效的 icon name | — |
| prefixIcon | 	输入框前置 icon name | string | Font Awesome 有效的 icon name | — |
| showPassword | 在 password 模式下，是否可以查看明文密码 | boolean | true / false | false |
| minLength | 输入框内容最小长度 | number | — | — |
| maxLength | 	输入框内容最大长度 | number | — | — |
| showWordLimit | 是否显示字数统计 | boolean | true / false | false |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| input | 输入框 input 事件 | (event: Event) => void |
| focus | 输入框 focus 事件 | (event: FocusEvent) => void |
| blur | 输入框 blur 事件 | (event: FocusEvent) => void |
| clear | 点击清空按钮触发的事件 | () => void |

### Slots
| name | 说明 |
| --- | ---  |
| append | 输入框前置 slot |
| prepend | 输入框后置 slot |
| prefix-icon | 输入框前置 icon slot |
| suffix-icon | 输入框后置 icon slot |
