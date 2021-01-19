<template>
  <form class='ki-form'>
    <slot></slot>
  </form>
</template>

<script lang='ts'>
import {
  defineComponent,
  PropType,
  provide,
  reactive,
  getCurrentInstance,
} from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { RuleItem } from 'async-validator';

export const FORM_REF = Symbol.for('form');

export type FormRuleItem = RuleItem & { trigger: 'change' | 'blur' };

export interface Rules {
  [key: string]: FormRuleItem[];
}

export interface FormModel {
  [key: string]: any;
}

export interface FormRef {
  rules: Rules;
  model: FormModel;
  changeFields: (key: string, field: Field) => void;
}

export interface ValidateFun {
  (value: any): Promise<boolean>;
}

export interface Field {
  validates: ValidateFun[];
  reset: () => void;
}

export interface Fields {
  [key: string]: Field;
}

export type FormInstance = ComponentInternalInstance & {
  validate: (callback: (status: boolean) => void) => void;
  reset: () => void;
};

export default defineComponent({
  name: 'Form',
  props: {
    rules: {
      type: Object as PropType<Rules>,
      default: {},
    },
    model: {
      type: Object as PropType<FormModel>,
      required: true,
    },
  },
  setup(props) {
    /**
     * fields 用来保存 fromItem 组件产生的 validate 和 reset 方法，通过 fromItem 的 prop 和 model 的 key
     * 确定对应关系，如：
     * {
     *   username: {
     *     validate: () => {},
     *     reset: {},
     *   },
     *   password: {},
     *   ...
     * }
     */
    const fields = reactive<Fields>({});
    const changeFields = (key: string, field: Field) => {
      fields[key] = field;
    };

    // inject
    provide<FormRef>(FORM_REF, {
      rules: props.rules,
      model: props.model,
      changeFields,
    });

    const instance = getCurrentInstance();
    // 挂载实例方法
    // 校验
    (instance as FormInstance).validate = async (callback: (status: boolean) => void) => {
      let validateStatus = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(props.model)) {
        const validateFun = fields[key]?.validates;
        if (validateFun && validateFun.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const fun of validateFun) {
            // eslint-disable-next-line no-await-in-loop
            const status = await fun(props.model[key]);
            if (!status && validateStatus) {
              validateStatus = false;
            }
          }
        }
      }
      if (typeof callback === 'function') {
        callback(validateStatus);
      }
      return validateStatus;
    };

    // 重置
    (instance as FormInstance).reset = () => {
      Object.keys(props.model).forEach((key: string) => {
        if (fields[key] && fields[key].reset) {
          fields[key].reset();
        }
      });
    };
  },
});
</script>

<style scoped>

</style>
