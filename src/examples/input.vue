<template>
  <div>
    <Container
      title='基本用法'
      sub-title='Input 输入框的基本使用'
    >
      <ki-input v-model='input' style='width: 300px'/>
    </Container>
    <Container
      title='禁用状态'
      sub-title='禁用输入框'
    >
      <ki-input v-model='input' style='width: 300px' disabled />
    </Container>
    <Container
      title='可清空'
      sub-title='可以清空输入框内容'
    >
      <ki-input v-model='input1' style='width: 300px' clearable />
    </Container>
    <Container
      title='密码框'
      sub-title=''
    >
      <ki-input v-model='input2' style='width: 300px' type='password' show-password />
    </Container>
    <Container
      title='带 Icon 的输入框'
      sub-title=''
    >
      <div>
        <span>属性方式：</span>
        <ki-input v-model='input3' style='width: 300px; margin: 0 20px;' prefix-icon='user-circle-o' />
        <ki-input v-model='input3' style='width: 300px' suffix-icon='laptop' />
      </div>
      <div style='margin-top: 20px'>
        <span>Slot 方式：</span>
        <ki-input v-model='input3' style='width: 300px; margin: 0 20px;'>
          <template #prefix-icon>
            <Icon type='user-circle-o'/>
          </template>
        </ki-input>
        <ki-input v-model='input3' style='width: 300px' suffix-icon='laptop'>
          <template #suffix-icon>
            <Icon type='laptop'/>
          </template>
        </ki-input>
      </div>
    </Container>
    <Container
      title='文本域'
      sub-title='适用于多行输入场景，type 指定为 textarea 即可'
    >
      <ki-input v-model='input4' style='width: 400px' type='textarea' :row='4' />
    </Container>
    <Container
      title='复合性输入框'
      sub-title='可前置或后置元素，一般为标签或按钮'
    >
      <ki-input v-model='input5' style='width: 400px'>
        <template #append>
          <icon type='search' />
        </template>
      </ki-input>
      <br/>
      <ki-input v-model='input6' style='width: 400px; margin: 20px 0;'>
        <template #prepend>
          .com
        </template>
      </ki-input>
      <br/>
      <ki-input v-model='input7' style='width: 400px;'>
        <template #append>
          https
        </template>
        <template #prepend>
          .com
        </template>
      </ki-input>
    </Container>
    <Container
      title='输入长度限制'
      sub-title=''
    >
      <ki-input v-model='input8' style='width: 400px' :min-length='0' :max-length='10' show-word-limit />
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' target='event' title='Input Events' />
    <Attributes :attributes='slots' target='slot' title='Input Slots' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Input, Icon } from '@/components';
import Container from './component/container.vue';
import Attributes from './component/attributes.vue';

export default defineComponent({
  name: 'InputExample',
  components: {
    Container,
    Icon,
    KiInput: Input,
    Attributes,
  },
  setup() {
    const input = ref('');
    const input1 = ref('');
    const input2 = ref('');
    const input3 = ref('');
    const input4 = ref('');
    const input5 = ref('');
    const input6 = ref('');
    const input7 = ref('');
    const input8 = ref('');
    return {
      input,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      attributes: [
        {
          attribute: 'v-model',
          description: '输入框绑定值',
          type: 'string',
          option: '——',
          default: '——',
        },
        {
          attribute: 'type',
          description: '输入框类型',
          type: 'string',
          option: 'text | password | textarea',
          default: 'text',
        },
        {
          attribute: 'row',
          description: 'textarea 的 row',
          type: 'number',
          option: '——',
          default: '2',
        },
        {
          attribute: 'size',
          description: '输入框大小',
          type: 'number',
          option: 'small | medium | large | mini',
          default: 'medium',
        },
        {
          attribute: 'disabled',
          description: '是否禁用',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'clearable',
          description: '是否显示清空按钮',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'suffixIcon',
          description: '输入框后置 icon name',
          type: 'string',
          option: 'fontawesome 有效的 icon name',
          default: '——',
        },
        {
          attribute: 'prefixIcon',
          description: '输入框前置 icon name',
          type: 'string',
          option: 'fontawesome 有效的 icon name',
          default: '——',
        },
        {
          attribute: 'showPassword',
          description: '在 password 模式下，是否可以查看明文密码',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'minLength',
          description: '输入框内容最小长度',
          type: 'number',
          option: '——',
          default: '——',
        },
        {
          attribute: 'maxLength',
          description: '输入框内容最大长度',
          type: 'number',
          option: '——',
          default: '——',
        },
        {
          attribute: 'showWordLimit',
          description: '是否显示字数统计',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
      ],
      events: [
        {
          name: 'input',
          description: '输入框 input 事件',
          type: '(event: InputEvent) => void',
        },
        {
          name: 'focus',
          description: '输入框 focus 事件',
          type: '(event: FocusEvent) => void',
        },
        {
          name: 'blur',
          description: '输入框 blur 事件',
          type: '(event: Event) => void',
        },
        {
          name: 'clear',
          description: '点击清空按钮触发的事件',
          type: '() => void',
        },
      ],
      slots: [
        {
          name: 'append',
          description: '输入框前置 slot',
        },
        {
          name: 'prepend',
          description: '输入框后置 slot',
        },
        {
          name: 'prefix-icon',
          description: '输入框前置 icon slot',
        },
        {
          name: 'suffix-icon',
          description: '输入框后置 icon slot',
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>

</style>
