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
import { RuleItem } from 'async-validator';

export type FormRuleItem = RuleItem & { trigger: 'change' | 'blur' };

export interface Rules {
  [key: string]: FormRuleItem[];
}

export const FORM_REF = Symbol.for('form');
export interface FormRef {
  rules: Rules;
  pushValidateFunctionArr: (key: string, funs: ValidateFun[]) => void;
}

export interface ValidateFun {
  (value: any): Promise<boolean>;
}

export interface Validates {
  [key: string]: ValidateFun[];
}

export default defineComponent({
  name: 'Form',
  props: {
    rules: {
      type: Object as PropType<Rules>,
      default: {},
    },
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    const validates = reactive<Validates>({});
    const pushValidateFunctionArr = (key: string, funs: ValidateFun[]) => {
      validates[key] = funs;
    };

    // 挂载实例方法
    (instance as any).validate = async (callback: (status: boolean) => void) => {
      let validateStatus = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(props.model)) {
        const validateFun = validates[key];
        // eslint-disable-next-line no-restricted-syntax
        for (const fun of validateFun) {
          // eslint-disable-next-line no-await-in-loop
          const status = await fun(props.model[key]);
          if (!status && validateStatus) {
            validateStatus = false;
          }
        }
      }
      if (typeof callback === 'function') {
        callback(validateStatus);
      }
      return validateStatus;
    };

    provide<FormRef>(FORM_REF, {
      rules: props.rules,
      pushValidateFunctionArr,
    });
  },
});
</script>

<style scoped>

</style>
