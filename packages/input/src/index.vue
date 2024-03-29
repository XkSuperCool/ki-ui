<template>
  <div class='ki-input-inner' :class='size'>
    <div v-if='type === "textarea"' class='ki-textarea'>
      <textarea
        :rows='row'
        :disabled='disabled'
        :value='modelValue'
        :placeholder='placeholder'
        :readonly="readonly"
        :class='{disabled: disabled, error: validateStatus !== undefined && !validateStatus}'
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
          :class='{disabled: disabled, paddingLeft: isPaddingLeft, "input-prepend": isShowPrependSlot, error: validateStatus !== undefined && !validateStatus}'
          :placeholder='placeholder'
          :disabled='disabled'
          :min='minLength'
          :max='maxLength'
          :readonly="readonly"
          @input='handleInput'
          @focus='handleFocus'
          @blur='handleBlur'
          ref='inputRef'
        />
        <div class='right-icons'>
          <span class='length' v-if='showWordLimit && type === "text"'>
            {{modelValue ? modelValue.length : '0'}}/{{maxLength ?? '*'}}
          </span>
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
  defineComponent,
  computed,
  ref,
  onUpdated,
  PropType,
  inject,
} from 'vue';
import type { Ref } from 'vue';
import { ComponentSize } from 'types/common';
import Icon from '../../icon';
import { VALIDATE_FUNCTION, VALIDATE_STATUS } from 'packages/form/src/form-item.vue';
import type { EventValidateObject } from 'packages/form/src/form-item.vue';

export type InputSize = ComponentSize | 'mini';

export default defineComponent({
  name: 'ki-input',
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
    size: {
      type: String as PropType<InputSize>,
      default: 'medium',
    },
    disabled: Boolean,
    readonly: Boolean,
    modelValue: String,
    clearable: Boolean,
    suffixIcon: String,
    prefixIcon: String,
    showPassword: Boolean,
    minLength: [Number, String],
    maxLength: [Number, String],
    showWordLimit: Boolean,
  },
  emits: ['update:modelValue', 'input', 'focus', 'blur', 'clear'],
  setup(props, { emit, slots }) {
    const inputType = ref(props.type);
    const inputRef = ref(null);
    const isPaddingLeft = computed(() => props.prefixIcon || slots['prefix-icon']);
    const isShowPrependSlot = ref(slots.prepend !== undefined);
    const isShowAppendSlot = ref(slots.append !== undefined);
    const validateStatus = inject<Ref<boolean> | undefined>(VALIDATE_STATUS, undefined);

    // inject
    const validateObj = inject<EventValidateObject | null>(VALIDATE_FUNCTION, null);

    onUpdated(() => {
      /**
       * 更新后重新计算 slot 是否显示，
       * 因为删除 slot 时不会同步到页面，但是会触发 update，所以在这里修改 isShowPrependSlot、isShowAppendSlot，
       * 让修改同步到页面上。
       */
      isShowPrependSlot.value = slots.prepend !== undefined;
      isShowAppendSlot.value = slots.append !== undefined;
    });

    // input 事件
    const handleInput = (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      if (props.maxLength && value.length > props.maxLength && props.modelValue) {
        (inputRef.value as any as HTMLInputElement).value = props.modelValue;
        return;
      }
      emit('update:modelValue', value);
      emit('input', event);
      if (validateObj && validateObj.change) {
        validateObj.change();
      }
    };

    // 聚焦事件
    const handleFocus = (event: FocusEvent) => {
      emit('focus', event);
    };

    // 失去焦点事件
    const handleBlur = (event: FocusEvent) => {
      emit('blur', event);
      if (validateObj && validateObj.blur) {
        validateObj.blur();
      }
    };

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
      inputRef,
      inputType,
      isPaddingLeft,
      isShowPrependSlot,
      isShowAppendSlot,
      validateStatus,
      handleInput,
      handleFocus,
      handleClear,
      handleToggleInputType,
      handleBlur,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
