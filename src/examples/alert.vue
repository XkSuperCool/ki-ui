<template>
  <div>
    <Container
      title='基本使用'
    >
      <ki-alert type='success'>这时一段成功信息</ki-alert>
      <ki-alert type='info' style='margin: 20px 0;'>这时一段提示信息</ki-alert>
      <ki-alert type='warning'>这时一段警告信息</ki-alert>
      <ki-alert type='error' style='margin-top: 20px;'>这时一段失败信息</ki-alert>
    </Container>
    <Container
      title='可以关闭'
      sub-title='closable 可以让 alert 关闭，closeText 可以自定义文本'
    >
      <ki-alert type='success' closable>这时一段成功信息</ki-alert>
      <ki-alert type='info' style='margin: 20px 0;' closable close-text='关闭'>这时一段提示信息</ki-alert>
      <ki-alert type='warning' closable close-text='好的'>这时一段警告信息</ki-alert>
      <ki-alert type='error' style='margin-top: 20px;' closable close-text='上报'>这时一段失败信息</ki-alert>
    </Container>
    <Container
      title='显示 Icon'
    >
      <ki-alert type='success' icon>这时一段成功信息</ki-alert>
      <ki-alert type='info' style='margin: 20px 0;' icon>这时一段提示信息</ki-alert>
      <ki-alert type='warning' icon>这时一段警告信息</ki-alert>
      <ki-alert type='error' style='margin-top: 20px;' icon>这时一段失败信息</ki-alert>
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' target='event' title='Events' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Alert } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'AlertExample',
  components: {
    Container,
    Attributes,
    KiAlert: Alert,
  },
  setup() {
    return {
      attributes: [
        {
          attribute: 'type',
          description: 'alert 类型',
          type: 'success | info | error | warning',
          option: 'success | info | error | warning',
          default: 'success',
        },
        {
          attribute: 'closable',
          description: '是否可以关闭',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'closeText',
          description: '定义关闭描述文本',
          type: 'string',
          option: '——',
          default: '×',
        },
        {
          attribute: 'icon',
          description: '展示类型 icon',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
      ],
      events: [
        {
          name: 'close',
          description: '关闭时的回调',
          type: '() => void',
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>
