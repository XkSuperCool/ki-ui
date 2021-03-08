<template>
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
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Checkbox',
  props: {
    label: String,
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    indeterminate: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
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
