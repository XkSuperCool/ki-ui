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
  toRef,
} from 'vue';
import type { ComponentInternalInstance, Ref } from 'vue';
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
  showMessage?: boolean;
  changeFields: (key: string, field: Field) => void;
  labelWidth: Ref<string>;
}

export interface ValidateFun {
  (): Promise<boolean>;
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
    showMessage: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: 'auto',
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
      /*
      * TODO: 待优化：provider 下去的属性丢失了响应性，解决方案：使用 toRefs 传递 props
      * */
      rules: props.rules,
      model: props.model,
      showMessage: props.showMessage,
      labelWidth: toRef(props, 'labelWidth'),
      changeFields,
    });

    const instance = getCurrentInstance();
    // 挂载实例方法
    // 校验
    (instance as FormInstance).validate = async (callback: (status: boolean) => void) => {
      let validateStatus = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const { validates } of Object.values(fields)) {
        if (validates && validates.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const fun of validates) {
            // eslint-disable-next-line no-await-in-loop
            const status = await fun();
            if (!status && validateStatus) {
              validateStatus = false;
            }
            if (!status) {
              // 如果一个 Item 里的一个校验规则 error，则这个 Item 就没必要再进行后续的校验了。
              break;
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
