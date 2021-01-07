<template>
  <div
    class='ki-select'
    :class='{disabled: disabled, focus: focus}'
    :style='width && {width: width}'
    @click.stop='handleFocus'
  >
    <div
      class='content'
      @mouseenter='clearable && handleMouse(true)'
      @mouseleave='clearable && handleMouse(false)'
    >
      <input
        disabled
        placeholder='请选择'
        class='ki-select-input'
        :value='selectOption.label'
      />
      <icon type='times-circle-o' class='icon close' v-if='isShowClearIcon' @click.stop='handleClear' />
      <icon type='angle-down' class='icon' v-else />
    </div>
    <div class='ki-options' v-show='focus'>
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  provide,
  computed,
} from 'vue';
import Icon from '../icon';
import { Option } from './option.vue';

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
  },
  props: {
    modelValue: {
      type: [String, Number],
    },
    width: String,
    disabled: Boolean,
    clearable: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const focus = ref(false); // 是否聚焦
    const enterSelect = ref(false); // 鼠标是否进入了 select
    const selectOption = reactive<Option>({
      value: props.modelValue ?? '',
      label: '',
    });
    const isShowClearIcon = computed(() => props.clearable && enterSelect.value && selectOption.value);
    // 注入 value
    provide('option', selectOption);

    // 聚焦
    const handleFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
    };
    // 取消 focus
    const chanceFocus = () => {
      focus.value = false;
    };
    const changOption = (option: Option) => {
      selectOption.value = option.value;
      selectOption.label = option.label;
      chanceFocus();
      emit('update:modelValue', selectOption.value);
    };
    provide<(option: Option) => void>('changeOption', changOption);

    // 鼠标移入移出
    const handleMouse = (bool: boolean) => {
      enterSelect.value = bool;
    };

    // 清除选项
    const handleClear = () => {
      selectOption.value = '';
      selectOption.label = '';
      chanceFocus();
    };

    onMounted(() => {
      document.addEventListener('click', chanceFocus);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', chanceFocus);
    });

    return {
      focus,
      enterSelect,
      selectOption,
      isShowClearIcon,
      handleFocus,
      handleMouse,
      handleClear,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/select.less';
</style>
