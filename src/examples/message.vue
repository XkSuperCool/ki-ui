<template>
  <div>
    <Container
      title='基本使用'
      sub-title='从顶部出现，3 秒后自动消失。'
    >
      <ki-button @click='click1'>弹出消息提示</ki-button>
    </Container>
    <Container
      title='不同状态'
      sub-title='用来显示「成功、警告、消息、错误」类的操作反馈。'
    >
      <ki-button @click='click2("success")'>成功</ki-button>
      <ki-button @click='click3("error")' style='margin: 0 20px;'>失败</ki-button>
      <ki-button @click='click4("info")' style='margin-right: 20px;'>消息</ki-button>
      <ki-button @click='click5("warning")'>警告</ki-button>
    </Container>
    <Container
      title='设置时间'
      sub-title='通过 delay 属性设置显示时长, -1 则不会关闭。'
    >
      <ki-button @click='click6'>不会关闭</ki-button>
      <ki-button @click='close' style='margin: 0 20px;' type='warning' size='small'>手动关闭</ki-button>
      <ki-button @click='click7'>10s 后关闭</ki-button>
    </Container>
    <Container
      title='显示 Icon'
    >
      <ki-button @click='click8("success")'>成功</ki-button>
      <ki-button @click='click9("error")' style='margin: 0 20px;'>失败</ki-button>
      <ki-button @click='click10("info")' style='margin-right: 20px;'>消息</ki-button>
      <ki-button @click='click11("warning")'>警告</ki-button>
    </Container>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import {
  Button, Message,
} from '@/components';
import Container from './component/container.vue';

export default defineComponent({
  name: 'MessageExample',
  components: {
    KiButton: Button,
    Container,
  },
  setup() {
    let hide: any;
    return {
      click1() {
        Message.info('消息提示');
      },
      click2(info: string) {
        Message.success(info);
      },
      click3(info: string) {
        Message.error(info);
      },
      click4(info: string) {
        Message.info(info);
      },
      click5(info: string) {
        Message.warning(info);
      },
      click6() {
        hide = Message.warning({
          content: '这是一个不会关闭的提示',
          delay: -1,
        });
      },
      close() {
        hide();
      },
      click7() {
        Message.warning({
          content: '10s 后关闭',
          delay: 10000,
        });
      },
      click8(info: string) {
        Message.success({
          content: info,
          showIcon: true,
        });
      },
      click9(info: string) {
        Message.error({
          content: info,
          showIcon: true,
        });
      },
      click10(info: string) {
        Message.info({
          content: info,
          showIcon: true,
        });
      },
      click11(info: string) {
        Message.warning({
          content: info,
          showIcon: true,
        });
      },
    };
  },
});
</script>

<style scoped>

</style>
