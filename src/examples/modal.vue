<template>
  <div>
    <Container
      title='基本使用'
    >
      <a @click='visible = true'>显示弹出框</a>
      <ki-modal v-model='visible' title='提示' @on-ok='visible = false'>
        这时一段提示信息..
      </ki-modal>
    </Container>
    <Container
      title='自定义操作按钮文字'
    >
      <a @click='visible1 = true'>显示弹出框</a>
      <ki-modal v-model='visible1' title='提示' @on-ok='visible1 = false' cancel-text='关闭' ok-text='好的'>
        这时一段提示信息..
      </ki-modal>
    </Container>
    <Container
      title='嵌套弹框'
    >
      <a @click='visible2 = true'>显示弹出框</a>
      <ki-modal v-model='visible2' title='提示' @on-ok='visible2 = false' cancel-text='关闭' ok-text='好的'>
        <a @click='visible3 = true'>显示弹出框</a>
        <ki-modal v-model='visible3' title='提示' @on-ok='visible3 = false' offset='10%'>
          嵌套弹框
        </ki-modal>
      </ki-modal>
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' target='event' title='Events' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Modal } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'ModalExample',
  components: {
    Container,
    Attributes,
    KiModal: Modal,
  },
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    return {
      visible,
      visible1,
      visible2,
      visible3,
      attributes: [
        {
          attribute: 'v-model',
          description: '绑定值',
          type: 'boolean',
          option: '——',
          default: '——',
        },
        {
          attribute: 'title',
          description: '弹出框左上角的标题',
          type: 'string',
          option: '——',
          default: '——',
        },
        {
          attribute: 'width',
          description: '弹出框宽度',
          type: 'string',
          option: '——',
          default: '40%',
        },
        {
          attribute: 'offset',
          description: '弹出框距离顶部的偏移',
          type: 'string',
          option: '——',
          default: '20%',
        },
        {
          attribute: 'cancelText',
          description: '取消按钮自定义描述文字',
          type: 'string',
          option: '——',
          default: '取消',
        },
        {
          attribute: 'okText',
          description: '确定按钮自定义描述文字',
          type: 'string',
          option: '——',
          default: '确定',
        },
        {
          attribute: 'offset',
          description: '弹出框距离顶部的偏移',
          type: 'string',
          option: '——',
          default: '20%',
        },
        {
          attribute: 'closeOnPressEscape',
          description: '按下 ESC 键是否可以关闭',
          type: 'boolean',
          option: 'false | true',
          default: 'false',
        },
        {
          attribute: 'teleportBody',
          description: '是否添加到 Body 上',
          type: 'boolean',
          option: 'false | true',
          default: 'true',
        },
        {
          attribute: 'mask',
          description: '是否显示背景蒙层',
          type: 'boolean',
          option: 'false | true',
          default: 'true',
        },
        {
          attribute: 'showClose',
          description: '是否显示右上角关闭按钮',
          type: 'boolean',
          option: 'false | true',
          default: 'true',
        },
        {
          attribute: 'beforeClose',
          description: '弹出框关闭前的回调，接受一个 done 的函数，手动调用即可关闭',
          type: '(done: () => void) => void',
          option: '——',
          default: '——',
        },
      ],
      events: [
        {
          name: 'open',
          description: '打开弹出框时的回调',
          type: '() => void',
        },
        {
          name: 'close',
          description: '关闭弹出框时的回调',
          type: '() => void',
        },
        {
          name: 'on-cancel',
          description: '点击取消按钮时的回调',
          type: '() => void',
        },
        {
          name: 'on-ok',
          description: '点击确定按钮时的回调',
          type: '() => void',
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
  a {
    color: var(--primary-color);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: var(--primary-shallow-color);
    }
  }
</style>
