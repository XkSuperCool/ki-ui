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
} from 'vue';
import { RuleItem } from 'async-validator';

export interface Rules {
  [key: string]: RuleItem[];
}

export const FORM_REF = Symbol.for('form');
export interface FormRef {
  rules: Rules;
}

export default defineComponent({
  name: 'Form',
  props: {
    rules: {
      type: Object as PropType<Rules>,
      default: {},
    },
  },
  setup(props) {
    provide<FormRef>(FORM_REF, {
      rules: props.rules,
    });
  },
});
</script>

<style scoped>

</style>
