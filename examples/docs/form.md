## Form 表单
由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

### 基本用法
:::demo
```html
  <template>
    <ki-form :model='userForm1' style='width: 400px;' label-width='70px'>
      <ki-form-item label='用户名'>
        <ki-input v-model='userForm1.name' />
      </ki-form-item>
      <ki-form-item label='密码'>
        <ki-input v-model='userForm1.password' type='password' />
      </ki-form-item>
      <ki-form-item>
        <ki-button type='primary'>创建</ki-button>
      </ki-form-item>
    </ki-form>
  </template>

  <script>
    export default {
      data() {
        return {
          userForm1: {
            name: '',
            password: '',
          }
        }
      },
    }
  </script>
```
:::