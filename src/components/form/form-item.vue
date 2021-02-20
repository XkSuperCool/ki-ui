<template>
  <div class='ki-form-item'>
    <label class='label' :class='{required: isRequired}' :style='{width: itemLabelWidth}' v-if='label'>
      {{label}}
    </label>
    <div class='ki-form-item-inner'>
      <slot></slot>
      <div class='error-prompt' v-if='!validateStatus && isShowMessage'>
        {{validateMessage}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  provide,
  inject,
  ref,
  watch,
  toRef,
} from 'vue';
import type { Ref, PropType } from 'vue';
import Schema from 'async-validator';
import type { RuleType } from 'async-validator';
import { FORM_REF } from './form.vue';
import type { Field, FormRuleItem, FormRef } from './form.vue';

export const VALIDATE_FUNCTION = Symbol.for('validate');
export const VALIDATE_STATUS = Symbol.for('validate-status');

export interface EventValidateObject {
  change?: () => Promise<boolean>;
  blur?: () => Promise<boolean>;
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
    showMessage: {
      type: Boolean,
      default: undefined,
    },
    required: Boolean,
    requiredErrorMsg: String,
    requiredTrigger: {
      type: String as PropType<'change' | 'blur'>,
      default: 'blur',
    },
  },
  setup(props) {
    const form = inject<FormRef | undefined>(FORM_REF, undefined);
    const isRequired = ref(false);
    const validateStatus = ref(true);
    const validateMessage = ref('');
    // 保存初始化 value，用于重置表单
    const initialValue = form?.model && form?.model[props.prop as string];

    // 获取校验规则
    const getRole = (): FormRuleItem[] => {
      if (props.prop && form && form.rules) {
        if (form.rules[props.prop]) {
          return form.rules[props.prop];
        }
        if (props.required) {
          let type: string = typeof form.model[props.prop];
          if (type === 'object' && Array.isArray(form.model[props.prop])) {
            type = 'array';
          } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
            type = 'any';
          }
          return [
            {
              type: type as RuleType,
              required: true,
              message: props.requiredErrorMsg ?? `${props.prop} field is required`,
              trigger: props.requiredTrigger,
            },
          ];
        }
      }
      return [];
    };

    // 校验函数
    const validate = (roles: FormRuleItem[]): Promise<boolean> => new Promise((resolve) => {
      const validator = new Schema({
        [props.prop as string]: roles,
      });
      validator.validate({ [props.prop as string]: form?.model[props.prop as string] }, { firstFields: true }).then(() => {
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
          isRequired.value = true;
        }
        return r.trigger === eventName;
      });
      return role.length ? () => validate(role) : undefined;
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

    // 是否显示错误信息
    const isShowMessage = ref(props.showMessage);
    if (isShowMessage.value === undefined) {
      if (form?.showMessage) {
        isShowMessage.value = form?.showMessage;
      }
    }

    // 控制 label width
    const itemLabelWidth = ref<string>(props.labelWidth);
    if (itemLabelWidth.value === 'auto') {
      if (form?.labelWidth) {
        itemLabelWidth.value = form?.labelWidth.value;
      }
    }
    if (form && form.labelWidth.value !== 'auto') {
      watch((form as FormRef).labelWidth, (value: string) => {
        if (props.labelWidth === 'auto') {
          itemLabelWidth.value = value;
        }
      });
    }
    if (props.labelWidth !== 'auto') {
      watch(toRef(props, 'labelWidth'), (value: string) => {
        itemLabelWidth.value = value;
      });
    }

    return {
      isRequired,
      itemLabelWidth,
      validateStatus,
      validateMessage,
      isShowMessage,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/item.less';
</style>
