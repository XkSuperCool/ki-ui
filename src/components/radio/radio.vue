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
import {
  defineComponent, computed, ref, inject,
} from 'vue';
import { RADIO_GROUP_PROVIDE } from './radio-group.vue';
import type { RadioGroupProvide, ModelValue } from './radio-group.vue';
import { VALIDATE_FUNCTION } from '../form/form-item.vue';
import type { EventValidateObject } from '../form/form-item.vue';

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

    const groupInstance = inject<RadioGroupProvide | undefined>(RADIO_GROUP_PROVIDE, undefined);
    const validateObj = inject<EventValidateObject | null>(VALIDATE_FUNCTION, null);

    const model = computed({
      get: () => {
        if (groupInstance) {
          return groupInstance.model.value;
        }
        return props.modelValue;
      },
      set: (val) => {
        if (groupInstance) {
          groupInstance.handleChange(val as ModelValue);
        } else {
          emit('update:modelValue', val);
        }
        if (radioRef.value) {
          radioRef.value.checked = model.value === props.label;
        }
      },
    });

    /**
     * input change
     */
    const handleChange = () => {
      if (validateObj) {
        if (validateObj.change) {
          validateObj.change();
        }
        if (validateObj.blur) {
          validateObj.blur();
        }
      }
      emit('change', props.label);
    };

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
