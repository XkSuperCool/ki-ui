<template>
  <div>
    <Container
      title='基本用法'
      sub-title='Radio 的基本用法'
    >
      <template #default>
        <ki-radio v-model='radio' label='1'>单选框1</ki-radio>
        <ki-radio v-model='radio' label='2'>单选框2</ki-radio>
        <ki-radio v-model='radio' label='3'>单选框3</ki-radio>
      </template>
    </Container>
    <Container
      title='禁用状态'
      sub-title='Radio 的禁用状态'
    >
      <template #default>
        <ki-radio v-model='radio1' label='1' disabled>单选框1</ki-radio>
        <ki-radio v-model='radio1' label='2' disabled>单选框2</ki-radio>
        <ki-radio v-model='radio1' label='3' disabled>单选框3</ki-radio>
      </template>
    </Container>
    <Container
      title='单选框组'
      sub-title='适用于在多个互斥的选项中选择的场景'
    >
      <template #default>
        <ki-radio-group v-model='radio3'>
          <ki-radio label='1'>单选框1</ki-radio>
          <ki-radio label='2'>单选框2</ki-radio>
          <ki-radio label='3'>单选框3</ki-radio>
        </ki-radio-group>
      </template>
    </Container>
    <Container
      title='带边框的 Radio'
      sub-title=''
    >
      <template #default>
        <ki-radio v-model='radio4' label='1' border>单选框1</ki-radio>
        <ki-radio v-model='radio4' label='2' border>单选框2</ki-radio>
        <ki-radio v-model='radio4' label='3' border>单选框3</ki-radio>
      </template>
    </Container>
    <Attributes :attributes='attribute'/>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Radio } from '@/components';
import Container from './component/container.vue';
import Attributes from './component/attributes.vue';

export default defineComponent({
  name: 'radioExample',
  components: {
    Container,
    Attributes,
    KiRadio: Radio,
    KiRadioGroup: Radio.Group,
  },
  setup() {
    const radio = ref('1');
    const radio1 = ref('2');
    const radio3 = ref('3');
    const radio4 = ref('1');
    const attribute = [
      {
        attribute: 'v-model',
        description: '绑定值',
        type: 'string | number | boolean',
        option: '——',
        default: '——',
      },
      {
        attribute: 'label',
        description: 'Radio 的 value',
        type: 'string | number | boolean',
        option: '——',
        default: '——',
      },
      {
        attribute: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'border',
        description: '是否带有边框',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
    ];
    return {
      radio,
      radio1,
      radio3,
      radio4,
      attribute,
    };
  },
});
</script>

<style scoped>

</style>
