<template>
  <label class='ki-radio' :class='{disabled: disabled, border: border, active: model === label}'>
    <span class='ki-radio-inner'>
      <span class='ki-radio-input' :class='{active: model === label}'></span>
      <input
        type='radio'
        ref='radioRef'
        :value='label'
        v-model='model'
        :tabindex='-1'
        :disabled='disabled'
        @change='handleChange'
      />
    </span>
    <span class='ki-radio-label-text' :class='{active: model === label}'>
      <slot></slot>
    </span>
  </label>
</template>

<script lang='ts'>
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'Radio',
  props: {
    modelValue: [String, Number, Boolean],
    label: [String, Number, Boolean],
    disabled: Boolean,
    border: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const radioRef = ref<null | HTMLInputElement >(null);
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
        if (radioRef.value) {
          radioRef.value.checked = model.value === props.label;
        }
      },
    });

    /**
     * input change
     */
    const handleChange = () => emit('change', props.label);

    return {
      model,
      radioRef,
      handleChange,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
