<template>
  <div class='ki-checkbox-wrap'>
    <label class='ki-checkbox' :class='{disabled: disabled}'>
      <span class='ki-checkbox-inner'>
        <span class='ki-checkbox-input' :class='{active: model, indeterminate: indeterminate}'></span>
        <input
          type='checkbox'
          v-model='model'
          :tabindex='-1'
          :disabled='disabled'
        />
      </span>
        <span class='ki-checkbox-text'>
        <slot>{{label}}</slot>
      </span>
    </label>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, inject } from 'vue';
import { CHECKBOX_GROUP_PROVIDE } from './checkbox-group.vue';
import type { CheckboxGroupProvide } from './checkbox-group.vue';

export default defineComponent({
  name: 'ki-checkbox',
  props: {
    label: [String, Number],
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    indeterminate: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const groupInstance = inject<CheckboxGroupProvide>(CHECKBOX_GROUP_PROVIDE, {});
    const model = computed({
      get() {
        if (groupInstance?.modelValue) {
          return groupInstance?.modelValue?.value?.includes(props.label as string | number);
        }
        return props.modelValue;
      },
      set(val) {
        if (groupInstance?.change) {
          groupInstance.change(props.label as string | number);
          return;
        }
        emit('update:modelValue', val);
        emit('change', val);
      },
    });

    return {
      model,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style';
</style>
