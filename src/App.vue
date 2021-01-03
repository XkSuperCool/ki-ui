<template>
  <div class='app'>
    <div class='title'>Button：</div>
    <div class='btns'>
      <Button @click='onClick' icon='plane'>
        default-icon
      </Button>
      <Button @click='onClick' icon='address-book' round type='success'>
        round-success
      </Button>
      <Button @click='onClick' icon='search' circular>
        circular
      </Button>
      <Button @click='onClick' size='small' type='primary'>
        small
      </Button>
      <Button @click='onClick' type='warning'>
        medium
      </Button>
      <Button @click='onClick' size='large' type='error'>
        large
      </Button>
      <Button @click='onClick' size='small' icon='close' disabled>
      </Button>
    </div>
    <div class='title'>Alert：</div>
    <div>
      <alert type='info' closable close-text='知道了' icon>提示文案</alert>
      <alert type='success' closable icon>提示文案</alert>
      <alert type='warning' icon>提示文案</alert>
      <alert type='error' closable @close='handleClose'>提示文案</alert>
    </div>
    <div class='title'>Message</div>
    <div class='btns'>
      <Button type='success' @click='showMessage("success")'>成功提示</Button>
      <Button type='error' @click='showMessage("error")'>失败提示</Button>
      <Button type='warning' @click='showMessage("warning")'>警告提示</Button>
      <Button type='info' @click='showMessage("info")'>信息提示</Button>
    </div>
    <div class='title'>Modal</div>
    <div>
      <Modal v-model:visible='visible' title='提示标题' @before-close='handleBeforeClose'>
        <div>
          modal 示例
        </div>
        <template v-slot:footer>
          <Button @click='onClick' size='small' type='success'>
            确定
          </Button>
          <Button @click='onClick' size='small' type='error'>
            取消
          </Button>
        </template>
      </Modal>
      <Button @click='handleShowModal'>
        Modal
      </Button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Button,
  Alert,
  Message,
  Modal,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Alert,
    Modal,
  },
  setup() {
    const visible = ref(true);

    return {
      onClick() {
        console.log('onClick');
      },
      handleClose() {
        console.log('close');
      },
      showMessage(type: string) {
        switch (type) {
          case 'success':
            Message.success('成功提示');
            break;
          case 'error':
            Message.error({ showIcon: false, content: '失败提示' });
            break;
          case 'warning':
            Message.warning({ content: '警告提示', iconClass: 'plane', offset: 50 });
            break;
          default: Message.info('信息提示');
        }
      },
      visible,
      handleShowModal() {
        visible.value = true;
      },
      handleBeforeClose(done: () => void) {
        console.log(3121);
        done();
      },
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
</style>
