<template>
 <div>
   <Container title='基础使用'>
     <a @click='handleOpen'>点击打开 Message Box</a>
   </Container>
   <Container title='确认消息'>
     <a @click='handleOpen2'>点击打开 Message Box</a>
   </Container>
   <Container
     title='提交内容'
     sub-title='当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。'
   >
     <a @click='handleOpen3'>点击打开 Message Box</a>
   </Container>
   <Container
     title='局中布局'
     sub-title='内容支持居中布局'
   >
     <a @click='handleOpen4'>点击打开 Message Box</a>
   </Container>
 </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { MessageBox, Message } from '@/components';
import { Container } from './component';

export default defineComponent({
  name: 'MessageBoxExample',
  components: {
    Container,
  },
  setup() {
    const { alert: $alert, confirm: $confirm, prompt: $prompt } = MessageBox;
    const handleOpen = () => {
      $alert('这里是内容区域..', {
        confirmButtonText: '知道了',
      }).then(() => {
        Message.success('ok');
      });
    };

    const handleOpen2 = () => {
      $confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
        iconType: 'warning',
      }).then(() => {
        Message.success('ok');
      }).catch(() => {
        Message.warning('cancel');
      });
    };

    const handleOpen3 = () => {
      $prompt('请输入邮箱', {
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '请输入正确的邮箱号',
        inputPlaceholder: '请输入邮箱',
      }).then((value) => {
        Message.success(`您的邮箱是: ${value}`);
      }).catch(() => {
        Message.warning('cancel');
      });
    };

    const handleOpen4 = () => {
      $confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
        iconType: 'warning',
        center: true,
        mask: false,
      }).then(() => {
        Message.success('ok');
      }).catch(() => {
        Message.warning('cancel');
      });
    };

    return {
      handleOpen,
      handleOpen2,
      handleOpen3,
      handleOpen4,
    };
  },
});
</script>

<style lang='less' scoped>
  a {
    color: var(--primary-shallow-color);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }
</style>
