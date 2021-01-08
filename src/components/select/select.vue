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
      <div class='select-container'>
        <div class='ki-select-tag' v-if='multiple'>
          <span v-for='option in selectOption' :key='option.value'>{{option.label}},</span>
        </div>
        <input
          v-if='!multiple'
          class='ki-select-input'
          :value='multiple ? "" : selectOption[0]?.label'
          :placeholder='selectOption.length ? "" : "请选择"'
        />
      </div>
      <icon type='times-circle-o' class='icon close' v-if='isShowClearIcon' @click.stop='handleClear' />
      <icon type='angle-down' class='icon' v-else />
    </div>
    <div class='ki-options' v-show='focus'>
      <div class='ki-options-content'>
        <slot></slot>
      </div>
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

export interface ChangeOptionParams {
  option: Option;
  active: boolean;
}

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
  },
  props: {
    modelValue: {
      type: [String, Number, Array],
    },
    width: String,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 断言警告
    if (props.multiple) {
      if (props.modelValue && !Array.isArray(props.modelValue)) {
        console.error('modelValue 必须为数组');
      }
    } else if (props.modelValue && Array.isArray(props.modelValue)) {
      console.error('modelValue 只能为 string | number');
    }

    // 选中的 options 数组定于
    const selectOption = reactive<Option[]>([]);
    provide('selectProps', props);

    // 是否聚焦
    const focus = ref(false);
    // 聚焦
    const handleFocus = () => {
      if (props.disabled) {
        return;
      }
      focus.value = true;
    };
    // 取消聚焦
    const chanceFocus = () => {
      focus.value = false;
    };

    // 修改 Option
    const changOption = (params: ChangeOptionParams) => {
      const { option, active } = params;
      if (props.multiple) {
        const index = selectOption.findIndex((item: Option) => item.value === option.value);
        if (active && index !== -1) {
          selectOption.splice(index, 1);
        } else {
          selectOption.push(option);
        }
        emit('update:modelValue', selectOption.map((item: Option) => item.value));
      } else {
        selectOption.splice(0, 1, option);
        emit('update:modelValue', selectOption[0].value);
        chanceFocus();
      }
    };
    provide<(params: ChangeOptionParams) => void>('changeOption', changOption);

    // 鼠标是否进入了 select
    const enterSelect = ref(false);
    // 鼠标移入移出
    const handleMouse = (bool: boolean) => {
      enterSelect.value = bool;
    };

    // 是否显示清除 icon
    const isShowClearIcon = computed(() => props.clearable && enterSelect.value && selectOption[0]?.value);

    // 清除选项
    const handleClear = () => {
      selectOption.splice(0, selectOption.length);
      emit('update:modelValue', props.multiple ? [] : '');
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
