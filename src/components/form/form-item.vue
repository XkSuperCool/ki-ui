<template>
  <div class='ki-form-item'>
    <label class='label' :style='{width: labelWidth}'>
      {{label}}
    </label>
    <div class='ki-form-item-inner'>
      <slot></slot>
      <div class='error-prompt' v-if='!validateStatus'>{{validateMessage}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  provide,
  inject,
  ref,
} from 'vue';
import Schema, { RuleItem } from 'async-validator';
import { FORM_REF, FormRef } from './form.vue';

export const VALIDATE_FUNCTION = Symbol.for('validate');

export default defineComponent({
  name: 'FormItem',
  props: {
    label: String,
    labelWidth: {
      type: String,
      default: 'auto',
    },
    prop: String,
  },
  setup(props) {
    const form = inject<FormRef>(FORM_REF);
    const validateStatus = ref(true);
    const validateMessage = ref('');

    // 获取校验规则
    const getRole = (): RuleItem[] => {
      if (props.prop && form) {
        return form.rules[props.prop] ? form.rules[props.prop] : [];
      }
      return [];
    };

    // 校验函数
    const validate = (value: any) => {
      validateStatus.value = true;
      const validator = new Schema({
        [props.prop as string]: getRole(),
      });
      validator.validate({ [props.prop as string]: value }, { firstFields: true }, (errors) => {
        if (errors.length) {
          validateStatus.value = false;
          validateMessage.value = errors[0].message;
        }
      });
    };

    provide(VALIDATE_FUNCTION, validate);

    return {
      validateStatus,
      validateMessage,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/item.less';
</style>
