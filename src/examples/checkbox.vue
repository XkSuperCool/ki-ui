<template>
  <div>
    <Container
      title='基本使用'
      sub-title='单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。'
    >
      <ki-check-box label='备选项' v-model='checked' />
    </Container>
    <Container
      title='禁用状态'
      sub-title='多选框不可用状态。'
    >
      <ki-check-box label='备选项' v-model='checked1' disabled />
      <ki-check-box label='备选项1' v-model='checked2' disabled />
    </Container>
    <Container
      title='多选框组'
      sub-title='适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。'
    >
      <ki-check-box-group v-model='hobby1'>
        <ki-check-box label='篮球'>篮球</ki-check-box>
        <ki-check-box label='跳舞'>跳舞</ki-check-box>
        <ki-check-box label='Rap'>Rap</ki-check-box>
      </ki-check-box-group>
      <div style='margin-top: 20px; font-size: 14px; color: var(--color)'>
        我喜欢：{{hobby1.join(', ')}}
      </div>
    </Container>
    <Container
      title='indeterminate 状态'
      sub-title='indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。'
    >
      <ki-check-box
        label='全选'
        v-model='allChecked'
        @change='handleAllChecked'
        :indeterminate='hobby.length > 0 && hobby.length !== 3'
      />
      <ki-check-box-group v-model='hobby' style='margin-top: 10px;' @change='handleHobbyChange'>
        <ki-check-box label='1'>篮球</ki-check-box>
        <ki-check-box label='2'>跳舞</ki-check-box>
        <ki-check-box label='3'>Rap</ki-check-box>
      </ki-check-box-group>
    </Container>
    <Attributes :attributes='attributes' title='Checkbox Attributes' />
    <Attributes :attributes='checkboxEvents' target='event' title='Checkbox Events' />
    <Attributes :attributes='groupAttributes' title='CheckboxGroup Attributes' />
    <Attributes :attributes='checkboxGroupEvents' target='event' title='CheckboxGroup Events' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { CheckBox } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'CheckboxExample',
  components: {
    Container,
    Attributes,
    KiCheckBox: CheckBox,
    KiCheckBoxGroup: CheckBox.Group,
  },
  setup() {
    const checked = ref(true);
    const checked1 = ref(true);
    const checked2 = ref(false);
    const allChecked = ref(false);
    const hobby = ref(['1']);
    const hobby1 = ref(['篮球']);

    const handleAllChecked = (isChecked: boolean) => {
      if (isChecked) {
        hobby.value = ['1', '2', '3'];
      } else {
        hobby.value = [];
      }
    };
    const handleHobbyChange = (value: (string | number)[]) => {
      allChecked.value = value.length === 3;
    };

    return {
      checked,
      checked1,
      checked2,
      allChecked,
      hobby,
      hobby1,
      handleAllChecked,
      handleHobbyChange,
      attributes: [
        {
          attribute: 'v-model',
          description: 'checkbox 绑定值',
          type: 'string | number | boolean',
          option: '——',
          default: '——',
        },
        {
          attribute: 'label',
          description: '选中状态的值，在 group 下该值会被添加到 group 绑定的数组中',
          type: 'string | number',
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
          attribute: 'indeterminate',
          description: '设置 indeterminate 状态，只负责样式控制',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
      ],
      checkboxEvents: [
        {
          name: 'change',
          description: '发生变化时调用',
          type: '(value: boolean) => void',
        },
      ],
      groupAttributes: [
        {
          attribute: 'v-model',
          description: 'checkbox-group 绑定值',
          type: '(string | number)[]',
          option: '——',
          default: '——',
        },
      ],
      checkboxGroupEvents: [
        {
          name: 'change',
          description: '发生变化时调用',
          type: '(value: (string | number)[]) => void',
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>
