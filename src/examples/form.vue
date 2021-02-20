<template>
  <div>
    <Container
      title='基本用法'
    >
      <ki-form :model='username1' style='width: 400px;' label-width='70px'>
        <ki-form-item label='用户名'>
          <ki-input v-model='username1.name' />
        </ki-form-item>
        <ki-form-item label='密码'>
          <ki-input v-model='username1.password' type='password' />
        </ki-form-item>
        <ki-form-item>
          <ki-button type='primary'>创建</ki-button>
        </ki-form-item>
      </ki-form>
      <p class='tip'>
        注意：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 form 标签上添加 @submit.native.prevent
      </p>
    </Container>
    <Container
      title='表单校验'
      sub-title='用于提交前对数据进行校验操作'
    >
      <ki-form :model='username2' style='width: 400px;' label-width='70px' :rules='rules' ref='formRef'>
        <ki-form-item label='用户名' prop='name'>
          <ki-input v-model='username2.name' />
        </ki-form-item>
        <ki-form-item label='密码' prop='password'>
          <ki-input v-model='username2.password' type='password' show-password />
        </ki-form-item>
        <ki-form-item label='密码' prop='repeatPassword'>
          <ki-input v-model='username2.repeatPassword' type='password' show-password />
        </ki-form-item>
        <ki-form-item label='爱好' prop='hobby'>
          <ki-select v-model='username2.hobby'>
            <ki-option label='敲代码' value='0'></ki-option>
            <ki-option label='篮球' value='1'></ki-option>
            <ki-option label='足球' value='2'></ki-option>
          </ki-select>
        </ki-form-item>
        <ki-form-item>
          <ki-button type='primary' style='margin-right: 10px;' @click='handleCreate'>创建</ki-button>
          <ki-button @click='handleReset'>重置</ki-button>
        </ki-form-item>
      </ki-form>
      <p class='tip'>
        本例也展示了自定义校验方式，更多可查看参考  <a href='https://github.com/yiminghe/async-validator' target='_blank'>async-validator</a>。
      </p>
    </Container>
    <Container
      title='简单非空校验'
      sub-title='如果只是非空校验，可以直接再 form-item 组件上指定 required=true 和 prop 值，而不需要指定 rules，这样可以完成一个简单的非空检验。还有 requiredErrorMsg 可以设置错误提示，requiredTrigger 设置触发方式（默认 blur）'
    >
      <ki-form :model='username3' style='width: 400px;' label-width='70px'>
        <ki-form-item label='用户名' required requiredErrorMsg='用户名不能为空' prop='name'>
          <ki-input v-model='username3.name' />
        </ki-form-item>
        <ki-form-item label='密码' required prop='password' requiredTrigger='change'>
          <ki-input v-model='username3.password' type='password' />
        </ki-form-item>
      </ki-form>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue';
import {
  Form, Input, Button, Message, Select,
} from '@/components';
import Container from './component/container.vue';

export default defineComponent({
  name: 'FormExample',
  components: {
    KiForm: Form,
    KiFormItem: Form.Item,
    KiInput: Input,
    KiButton: Button,
    KiSelect: Select,
    KiOption: Select.Option,
    Container,
  },
  setup() {
    const username1 = reactive({
      name: '',
      password: '',
    });

    const username2 = reactive({
      name: 'zhangsan',
      password: '',
      repeatPassword: '',
      hobby: '',
    });

    const username3 = reactive({
      name: '',
      password: '',
    });

    const formRef = ref();

    const handleCreate = () => {
      if (formRef.value) {
        formRef.value.$.validate().then((status) => {
          if (status) {
            Message.success('校验成功');
          } else {
            Message.error('校验失败');
          }
        });
      }
    };

    const handleReset = () => {
      if (formRef.value) {
        formRef.value.$.reset();
      }
    };

    const validatorFunction = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== username2.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const rules = {
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
        { validator: validatorFunction, trigger: 'change', required: true },
      ],
      hobby: [
        { required: true, message: '需要选择一个爱好', trigger: 'change' },
      ],
    };

    return {
      username1,
      username2,
      username3,
      rules,
      formRef,
      handleCreate,
      handleReset,
    };
  },
});
</script>

<style lang='less' scoped>
.tip {
  color: var(--color);
  font-size: 14px;
  text-indent: 2rem;
  line-height: 1.6;

  a {
    color: var(--primary-shallow-color);
    cursor: pointer;
  }
}
</style>
