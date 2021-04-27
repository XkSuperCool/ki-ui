## Form 表单
由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

### 基本用法

:::demo
```html
  <template>
    <ki-form :model='userForm' style='width: 400px;' label-width='70px'>
      <ki-form-item label='用户名'>
        <ki-input v-model='userForm.name' />
      </ki-form-item>
      <ki-form-item label='密码'>
        <ki-input v-model='userForm.password' type='password' />
      </ki-form-item>
      <ki-form-item>
        <ki-button type='primary' @click='create'>创建</ki-button>
      </ki-form-item>
    </ki-form>
  </template>

  <script>
    export default {
      data() {
        return {
          userForm: {
            name: '',
            password: '',
          }
        }
      },
      methods: {
        create() {
          window.alert(JSON.stringify(this.userForm,  null, 2));
        },
      },
    }
  </script>
```
:::

> W3C 标准中规定:   
>   &emsp;&emsp;当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `ki-form` 标签上添加 `@submit.native.prevent` 属性。

### 表单校验
用于提交前对数据进行校验操作

:::demo
```html
  <template>
    <ki-form :model='userInfo' style='width: 400px;' label-width='90px' :rules='rules' ref='formRef'>
      <ki-form-item label='用户名' prop='name'>
        <ki-input v-model='userInfo.name' />
      </ki-form-item>
      <ki-form-item label='密码' prop='password'>
        <ki-input v-model='userInfo.password' type='password' show-password />
      </ki-form-item>
      <ki-form-item label='重复密码' prop='repeatPassword'>
        <ki-input v-model='userInfo.repeatPassword' type='password' show-password />
      </ki-form-item>
      <ki-form-item label='爱好' prop='hobby'>
        <ki-select v-model='userInfo.hobby'>
          <ki-option label='敲代码' value='0'></ki-option>
          <ki-option label='篮球' value='1'></ki-option>
          <ki-option label='足球' value='2'></ki-option>
        </ki-select>
      </ki-form-item>
      <ki-form-item>
        <ki-button type='primary' @click='handleCreate'>创建</ki-button>
        <ki-button @click='handleReset'>重置</ki-button>
      </ki-form-item>
    </ki-form>
  </template>

  <script>
    export default {
      data() {
        return {
          userInfo: {
            name: '',
            password: '',
            repeatPassword: '',
            hobby: '',
          },
          rules: {
            name: [
              { required: true, message: '用户名为必填项', trigger: 'change' },
              { min: 3, message: '用户名最少为 3 位', trigger: 'change' },
            ],
            password: [
              { required: true, message: '密码为必填项', trigger: 'change' },
              { min: 6, message: '密码长度最短为 6 位', trigger: 'change' },
              { max: 12, message: '密码长度最长为 12 位', trigger: 'change' },
            ],
            repeatPassword: [
              { validator: this.validator, trigger: 'change', required: true },
            ],
            hobby: [
              { required: true, message: '需要选择一个爱好', trigger: 'change' },
            ],
          },
        }
      },
      methods: {
        handleCreate() {
          this.$refs.formRef.validate().then((status: boolean) => {
            if (status) {
              this.$message.success('校验成功');
            } else {
              this.$message.error('校验失败');
            }
          });
        },
        handleReset() {
          this.$refs.formRef.reset();
        },
        validator(rule, value, callback) {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.userInfo.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        },
      },
    }
  </script>
```
:::

> 更多校验方式请查看: [async-validator](https://github.com/yiminghe/async-validator)

### 简单非空校验
&nbsp;&nbsp;&nbsp;&nbsp;如果只是非空校验，可以直接在 `ki-form-item` 组件上指定 `required` 和 `prop` 值，而不需要指定 `rules`，这样可以完成一个简单的非空检验。还有 `requiredErrorMsg` 可以设置错误提示，`requiredTrigger` 设置触发方式（默认 `blur`）。

:::demo
```html
  <template>
    <ki-form :model='userInfo' style='width: 400px;' label-width='70px'>
      <ki-form-item label='用户名' required requiredErrorMsg='用户名不能为空' prop='name'>
        <ki-input v-model='userInfo.name' />
      </ki-form-item>
      <ki-form-item label='密码' required prop='password' requiredTrigger='change'>
        <ki-input v-model='userInfo.password' type='password' />
      </ki-form-item>
    </ki-form>
  </template>

  <script>
    export default {
      data() {
        return {
          userInfo: {
            name: '',
            password: '',
          }
        }
      },
      methods: {
      },
    }
  </script>
```
:::

### Form Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| model | 表单数据对象 | object | — | — |
| rules | 校验规则对象 | object | — | — |
| showMessage | 是否显示错误信息 | boolean | true / false | true |
| labelWidth | label 的宽度 | string | — | auto |

### Form Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| validate | 触发表单校验，可以通过参数回调或返回的 Promise .then 获取校验结果 | (callback: (val: boolean) => void) => Promise<boolean> |
| reset | 重置表单 | () => void |

### FormItem Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| label | 标签文本 | string | — | — |
| prop | 表单域 model 字段，在使用 validate、reset 方法的情况下，该属性是必填的 | string | 传入 Form 组件的 model 中的字段 | — |
| showMessage | 是否显示错误信息 | boolean | true / false | true |
| required | 是否必填，简单的非空校验，需要配合 prop 属性 | boolean | true / false | false |
| requiredErrorMsg | 指定 required 属性后，校验失败提示 msg | string | — | {prop} field is required |
| requiredTrigger |	指定 required 属性后，校验触发方式 | string | change / blur | blur |
