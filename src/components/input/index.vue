<template>
  <div class='ki-input-inner'>
    <div v-if='inputType === "textarea"' class='ki-textarea'>
      <textarea
        :rows='row'
        :disabled='disabled'
        :value='modelValue'
        :placeholder='placeholder'
        :class='{disabled: disabled}'
        @input='handleInput'
        @focus='handleFocus'
        @blur='handleBlur'
      ></textarea>
    </div>
    <div class='ki-input' v-else>
      <div class='append' v-if='isShowAppendSlot'>
        <slot name='append'></slot>
      </div>
      <div class='ki-input-content'>
        <div class='left-icon'>
          <Icon :type='prefixIcon' v-if='prefixIcon'></Icon>
          <slot name='prefix-icon' v-else></slot>
        </div>
        <input
          :type='inputType'
          :value='modelValue'
          :class='{disabled: disabled, paddingLeft: isPaddingLeft, "input-prepend": isShowPrependSlot}'
          :placeholder='placeholder'
          :disabled='disabled'
          @input='handleInput'
          @focus='handleFocus'
          @blur='handleBlur'
        />
        <div class='right-icons'>
          <Icon :type='suffixIcon' v-if='suffixIcon'></Icon>
          <slot name='suffix-icon' v-else></slot>
          <Icon type='eye' v-if='type === "password" && modelValue && showPassword' @click.stop='handleToggleInputType' />
          <Icon type='times-circle-o close' v-if='clearable && modelValue' @click.stop='handleClear' />
        </div>
      </div>
      <div class='prepend' v-if='isShowPrependSlot'>
        <slot name='prepend'></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, computed, ref, onUpdated,
} from 'vue';
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
    row: {
      type: Number,
      default: 2,
    },
    disabled: Boolean,
    modelValue: String,
    clearable: Boolean,
    suffixIcon: String,
    prefixIcon: String,
    showPassword: Boolean,
  },
  emits: ['update:modelValue', 'input', 'focus', 'blur', 'clear'],
  setup(props, { emit, slots }) {
    const inputType = ref(props.type);
    const isPaddingLeft = computed(() => props.prefixIcon || slots['prefix-icon']);
    const isShowPrependSlot = ref(slots.prepend !== undefined);
    const isShowAppendSlot = ref(slots.append !== undefined);

    onUpdated(() => {
      // 更新后重新计算 slot 是否显示
      isShowPrependSlot.value = slots.prepend !== undefined;
      isShowAppendSlot.value = slots.append !== undefined;
    });

    // input 事件
    const handleInput = (event: InputEvent) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
      emit('input', event);
    };

    // 聚焦事件
    const handleFocus = (event: FocusEvent) => {
      emit('focus', event);
    };

    // 失去焦点事件
    const handleBlur = (event: InputEvent) => emit('blur', event);

    // 清除 input value
    const handleClear = () => {
      emit('update:modelValue', '');
      emit('clear');
    };

    // password 和 text 之间的切换
    const handleToggleInputType = () => {
      inputType.value = inputType.value === 'password' ? 'text' : 'password';
    };

    return {
      isPaddingLeft,
      isShowPrependSlot,
      isShowAppendSlot,
      handleInput,
      handleFocus,
      handleClear,
      inputType,
      handleToggleInputType,
      handleBlur,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
