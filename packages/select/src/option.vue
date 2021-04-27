<template>
  <div
    class='ki-option'
    :class='{active: isActive, disabled: disabled, multiple: multiple}'
    @click.stop='handleSelect'
  >
    {{label}}
    <Icon type='check' class='arrow' />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  inject,
  onMounted,
  computed,
} from 'vue';

import { ChangeOptionParams } from './select.vue';
import Icon from 'packages/icon';

export interface Option {
  label: string | number;
  value: string | number;
}

export default defineComponent({
  name: 'ki-option',
  components: {
    Icon,
  },
  props: {
    label: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    disabled: Boolean,
  },
  setup(props) {
    const selectProps = inject<any>('selectProps');
    const multiple = computed(() => selectProps.multiple);
    const changeOption = inject<(params: ChangeOptionParams) => void>('changeOption');
    const isActive = computed(() => {
      if (!props.disabled) {
        if (selectProps.multiple && Array.isArray(selectProps.modelValue)) {
          return selectProps.modelValue.some((value: string | number) => props.value === value);
        }
        return selectProps.modelValue === props.value;
      }
      return false;
    });

    const handleSelect = () => {
      if (props.disabled) {
        return;
      }
      if (changeOption) {
        changeOption({
          option: {
            label: props.label,
            value: props.value,
          },
          active: true,
        });
      }
    };

    onMounted(() => {
      if (isActive.value) {
        handleSelect();
      }
    });

    return {
      isActive,
      handleSelect,
      multiple,
    };
  },
});
</script>

<style scoped lang='less'>
@import './style/option.less';
</style>
