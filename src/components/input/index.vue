<template>
  <div class='ki-input'>
    <div class='left-icon'>
      <Icon :type='suffixIcon' v-if='prefixIcon'></Icon>
      <slot name='prefix-icon' v-else></slot>
    </div>
    <input
      :type='type'
      :value='modelValue'
      :class='{disabled: disabled, paddingLeft: isPaddingLeft }'
      :placeholder='placeholder'
      :disabled='disabled'
      @input='handleInput'
      @focus='handleFocus'
    />
    <div class='right-icons'>
      <Icon :type='suffixIcon' v-if='suffixIcon'></Icon>
      <slot name='suffix-icon' v-else></slot>
      <Icon
        type='times-circle-o close'
        v-if='clearable && modelValue'
        @click.stop='handleClear'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import Icon from '../icon';

export default defineComponent({
  name: 'Input',
  components: {
    Icon,
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: Boolean,
    modelValue: String,
    clearable: Boolean,
    suffixIcon: String,
    prefixIcon: String,
  },
  emits: ['update:modelValue', 'input', 'focus'],
  setup(props, { emit, slots }) {
    const isPaddingLeft = computed(() => props.prefixIcon || slots['prefix-icon']);

    const handleInput = (event: InputEvent) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
      emit('input', event);
    };

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event);
    };

    const handleClear = () => emit('update:modelValue', '');

    return {
      isPaddingLeft,
      handleInput,
      handleFocus,
      handleClear,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
