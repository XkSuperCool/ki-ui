<template>
  <div class='app'>
    <Form :rules='rules'>
      <FormItem label='密码' prop='password'>
        <ki-input type='password' v-model='password' style='width: 300px' show-password placeholder='请输入密码' />
      </FormItem>
    </Form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Input,
  Form,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    KiInput: Input,
    Form,
    FormItem: Form.Item,
  },
  setup() {
    const password = ref();
    const rules = {
      password: [
        { required: true, message: '请输入密码', trigger: 'input' },
        { min: 10, message: '最小10位', trigger: 'input' },
      ],
    };
    return {
      password,
      rules,
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
