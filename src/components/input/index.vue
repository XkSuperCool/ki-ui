<template>
  <div class='ki-input'>
    <input
      :type='type'
      :value='modelValue'
      :class='{disabled: disabled}'
      :placeholder='placeholder'
      :disabled='disabled'
      @input='handleInput'
      @focus='handleFocus'
    />
    <div class='right-icons'>
      <Icon
        type='times-circle-o close'
        v-if='clearable && modelValue'
        @click.stop='handleClear'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
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
  },
  emits: ['update:modelValue', 'input', 'focus'],
  setup(props, { emit }) {
    const handleInput = (event: InputEvent) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
      emit('input', event);
    };

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event);
    };

    const handleClear = () => emit('update:modelValue', '');

    return {
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
