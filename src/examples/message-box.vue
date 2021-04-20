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
   <Container
     title='HTML 片段'
     sub-title='message 属性支持传入 HTML 片段。'
   >
     <a @click='handleOpen5'>点击打开 Message Box</a>
   </Container>
   <Container
     title='区分取消与关闭'
     sub-title='有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。'
   >
     <a @click='handleOpen6'>点击打开 Message Box</a>
   </Container>
   <Container
     title='关闭前的回调'
     sub-title='指定 beforeClose 后可以手动关闭 message box，它接受一个 callback 调用后即可关闭, 如果点击的是确认按钮还会有一个 loading 效果'
   >
     <a @click='handleOpen7'>点击打开 Message Box</a>
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
      }).catch(() => {
        Message.warning('cancel');
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

    const handleOpen5 = () => {
      $alert('<i>这是一个 <span style="color: orange;">HTML</span> 片段</i>', 'HTML 片段', {
        dangerouslyUseHTMLString: true,
      }).then(() => {
        Message.success('ok');
      }).catch(() => {
        Message.warning('cancel');
      });
    };

    const handleOpen6 = () => {
      $confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
        iconType: 'warning',
        distinguishCancelAndClose: true,
      }).then(() => {
        Message.success({
          content: '保存修改',
        });
      }).catch((action) => {
        Message.info(action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面');
      });
    };

    const handleOpen7 = () => {
      $confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
        iconType: 'warning',
        beforeClose(done, action) {
          if (action === 'confirm') {
            setTimeout(done, 2000);
          } else {
            done();
          }
        },
      }).then(() => {
        Message.success('文件删除成功！');
      }).catch(() => {
        Message.warning('取消删除文件！');
      });
    };

    return {
      handleOpen,
      handleOpen2,
      handleOpen3,
      handleOpen4,
      handleOpen5,
      handleOpen6,
      handleOpen7,
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
