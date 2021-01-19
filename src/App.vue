<template>
  <div class='app'>
    <Form :rules='rules' ref='form' :model='formModel' label-width='60px'>
      <FormItem label='用户名' prop='username'>
        <ki-input type='text' v-model='formModel.username' style='width: 300px' placeholder='请输入用户名' />
      </FormItem>
      <FormItem label='密码' prop='password'>
        <ki-input type='password' v-model='formModel.password' style='width: 300px' show-password placeholder='请输入密码' />
      </FormItem>
      <FormItem label='描述' required prop='desc'>
        <ki-input type='textarea' :row='5' v-model='formModel.desc' style='width: 300px' show-password placeholder='请输入描述' />
      </FormItem>
      <FormItem>
        <Button @click='validate'>校验</Button>
        <Button @click='reset'>重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue';
import {
  Input,
  Form,
  Button,
  Message,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    KiInput: Input,
    Form,
    FormItem: Form.Item,
    Button,
  },
  setup() {
    const form = ref(null);
    const formModel = reactive({
      password: '',
      username: '小明',
      desc: '',
    });
    const rules = {
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 10, message: '最小10位', trigger: 'blur' },
      ],
      username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { min: 3, message: '最小3位', trigger: 'blur' },
        { max: 6, message: '最大6位', trigger: 'blur' },
      ],
      // desc: [
      //   { min: 10, message: '最小10位', trigger: 'change' },
      //   { max: 200, message: '最大200位', trigger: 'change' },
      // ],
    };

    const validate = () => {
      // eslint-disable-next-line consistent-return
      (form.value as any).$.validate().then((status: boolean) => {
        if (!status) {
          return Message.error('请按照规范填写表单');
        }
        Message.success('用户注册成功');
      });
    };

    const reset = () => {
      (form.value as any).$.reset();
    };

    return {
      formModel,
      rules,
      form,
      validate,
      reset,
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .title {
    margin: 5px 0;
  }

  .btns {
    .ki-btn {
      margin-right: 10px;
    }
  }

  .ki-alert {
    margin-bottom: 5px;
  }

  .tags > div {
    margin-right: 3px;
  }
</style>
