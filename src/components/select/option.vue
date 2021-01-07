<template>
  <div
    class='ki-option'
    :class='{active: isActive, disabled: disabled}'
    @click.stop='handleSelect'
  >
    {{label}}
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  inject,
  onMounted,
  computed,
} from 'vue';

export interface Option {
  label: string | number;
  value: string | number;
}

export default defineComponent({
  name: 'Option',
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
    const selectOption = inject<Option>('option');
    const changeOption = inject<(option: Option) => void>('changeOption');
    const isActive = computed(() => {
      if (selectOption) {
        return selectOption.value === props.value && props.disabled === false;
      }
      return false;
    });

    const handleSelect = () => {
      if (props.disabled) {
        return;
      }
      if (selectOption && changeOption) {
        changeOption({
          label: props.label,
          value: props.value,
        });
      }
    };

    onMounted(() => {
      if (selectOption && selectOption.value === props.value && props.disabled === false) {
        handleSelect();
      }
    });

    return {
      isActive,
      selectOption,
      handleSelect,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/option.less';
</style>
