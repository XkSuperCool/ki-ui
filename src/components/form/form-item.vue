<template>
  <div class='ki-form-item'>
    <label class='label' :class='{required: required}' :style='{width: labelWidth}'>
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
import type { Ref } from 'vue';
import Schema from 'async-validator';
import { FORM_REF } from './form.vue';
import type { FormRuleItem, FormRef } from './form.vue';

export const VALIDATE_FUNCTION = Symbol.for('validate');

export interface EventValidateObject {
  change?: (value: any) => Promise<boolean>;
  blur?: (value: any) => Promise<boolean>;
}

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
    const required = ref(false);
    const validateStatus = ref(true);
    const validateMessage = ref('');

    // 获取校验规则
    const getRole = (): FormRuleItem[] => {
      if (props.prop && form) {
        return form.rules[props.prop] ? form.rules[props.prop] : [];
      }
      return [];
    };

    // 校验函数
    const validate = (value: any, role: FormRuleItem[]): Promise<boolean> => new Promise((resolve) => {
      const validator = new Schema({
        [props.prop as string]: role,
      });
      validator.validate({ [props.prop as string]: value }, { firstFields: true }).then(() => {
        validateStatus.value = true;
      }).catch(({ errors }) => {
        validateStatus.value = false;
        validateMessage.value = errors[0].message;
      }).finally(() => {
        resolve(validateStatus.value);
      });
    });

    // 生成对应事件的校验函数
    const generateEventValidate = (eventName: string) => {
      const role = getRole().filter((r) => {
        // 判断是否有必选校验
        if (r.required) {
          required.value = true;
        }
        return r.trigger === eventName;
      });
      return role.length ? (value: any) => validate(value, role) : undefined;
    };

    const blurValidate = generateEventValidate('blur');
    const changeValidate = generateEventValidate('change');
    if (form && props.prop) {
      const arr = [];
      if (blurValidate) arr.push(blurValidate);
      if (changeValidate) arr.push(changeValidate);
      if (arr.length) {
        form.pushValidateFunctionArr(props.prop, arr);
      }
    }
    provide<EventValidateObject>(VALIDATE_FUNCTION, {
      blur: blurValidate,
      change: changeValidate,
    });

    return {
      required,
      validateStatus,
      validateMessage,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/item.less';
</style>
