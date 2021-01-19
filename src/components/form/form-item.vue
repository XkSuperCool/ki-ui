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
import type { Field, FormRuleItem, FormRef } from './form.vue';

export const VALIDATE_FUNCTION = Symbol.for('validate');
export const VALIDATE_STATUS = Symbol.for('validate-status');

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
    // 保存初始化 value，用于重置表单
    const initialValue = form?.model[props.prop as string];

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

    // 重置函数
    const reset = () => {
      if (form && props.prop) {
        form.model[props.prop] = initialValue;
        validateStatus.value = true;
        validateMessage.value = '';
      }
    };

    // field 用于储存校验和重置函数，用于 from 的重置和校验功能
    const field: object = {};
    const blurValidate = generateEventValidate('blur');
    const changeValidate = generateEventValidate('change');
    // form 组件缓存校验函数
    if (form && props.prop) {
      const arr = [];
      if (blurValidate) arr.push(blurValidate);
      if (changeValidate) arr.push(changeValidate);
      if (arr.length) {
        (field as Field).validates = arr;
      }
      (field as Field).reset = reset;
      // eslint-disable-next-line no-unused-expressions
      form?.changeFields(props.prop, field as Field);
    }
    provide<EventValidateObject>(VALIDATE_FUNCTION, {
      blur: blurValidate,
      change: changeValidate,
    });
    provide<Ref<boolean>>(VALIDATE_STATUS, validateStatus);

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
