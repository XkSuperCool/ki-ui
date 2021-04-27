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