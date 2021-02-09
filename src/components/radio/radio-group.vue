<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, provide, toRef } from 'vue';
import type { Ref } from 'vue';

export const RADIO_GROUP_PROVIDE = Symbol.for('RADIO_GROUP_PROVIDE');

export type ModelValue = string | number | boolean | undefined;
export interface RadioGroupProvide {
  handleChange: (val: ModelValue) => void;
  model: Ref<ModelValue>;
}

export default defineComponent({
  name: 'RadioGroup',
  props: {
    modelValue: [String, Number, Boolean],
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const handleChange = (val: ModelValue) => {
      emit('update:modelValue', val);
      emit('change', val);
    };
    provide<RadioGroupProvide>(RADIO_GROUP_PROVIDE, {
      model: toRef(props, 'modelValue'),
      handleChange,
    });

    return {};
  },
});
</script>

<style scoped lang='less'>

</style>
