<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, provide, toRef } from 'vue';
import type { PropType, Ref } from 'vue';

export const CHECKBOX_GROUP_PROVIDE = Symbol.for('CHECKBOX_GROUP_PROVIDE');

export type ModelValue = (string | number)[];
export interface CheckboxGroupProvide {
  modelValue?: Ref<ModelValue> | Ref<undefined>;
  change?: (value: string | number) => void;
}

export default defineComponent({
  name: 'ki-checkbox-group',
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<ModelValue>,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    provide<CheckboxGroupProvide>(CHECKBOX_GROUP_PROVIDE, {
      modelValue: toRef(props, 'modelValue'),
      change: (value) => {
        const newValue = [...props.modelValue];
        const index = newValue.findIndex((item) => item === value);
        if (index !== -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(value);
        }
        emit('update:modelValue', newValue);
        emit('change', newValue);
      },
    });
  },
});
</script>
