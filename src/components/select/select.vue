<template>
  <div class='ki-select' :style='width && {width: width}' @click.stop='handleFocus'>
    <div
      class='content'
      :class='{focus: focus}'
      @mouseenter='clearable && handleMouse(true)'
      @mouseleave='clearable && handleMouse(false)'
    >
      <div
        class='ki-select-tag'
        v-if='multiple'
        ref='selectTagRef'
        @mouseenter='clearable && handleMouse(true)'
        @mouseleave='clearable && handleMouse(false)'
      >
        <Tag v-for='option in selectOption' :key='option.value' size='mini' closable @on-close='handleTagClose(option.value)' type='info'>
          {{option.label}}
        </Tag>
        <input v-if='false' />
      </div>
      <div
        class='ki-select-container'
        :class='{disabled: disabled, focus: focus}'
      >
        <input
          disabled
          class='ki-select-input'
          :value='multiple ? "" : selectOption[0]?.label'
          :placeholder='selectOption.length ? "" : placeholder'
          :style='{height: selectTagEleHeight + "px"}'
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
  nextTick,
} from 'vue';
import Icon from '../icon';
import Tag from '../tag/index.vue';
import { Option } from './option.vue';

export interface ChangeOptionParams {
  option: Option;
  active: boolean;
}

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
    Tag,
  },
  props: {
    modelValue: {
      type: [String, Number, Array],
    },
    width: String,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    placeholder: {
      type: String,
      default: '请选择',
    },
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

    // 多选模式下 tag div 数据
    const selectTagRef = ref<HTMLDivElement | null>(null);
    const selectTagEleHeight = ref(40);

    // 计算 Select 高度
    const computedSelectHeight = () => nextTick(() => {
      // 因为 tag 是定位在 select-container 上面的，修改 option 获取下 tag 的高度，然后让 select-container 也变高
      if (selectTagRef.value) {
        selectTagEleHeight.value = selectTagRef.value.getBoundingClientRect().height;
      }
    });

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
        computedSelectHeight();
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
      if (props.multiple) {
        computedSelectHeight();
      }
    };

    // 多选的 tag 关闭
    const handleTagClose = (value: string | number) => {
      const index = selectOption.findIndex((item) => item.value === value);
      if (index !== -1) {
        selectOption.splice(index, 1);
        emit('update:modelValue', selectOption.map((item: Option) => item.value));
        computedSelectHeight();
      }
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
      selectTagRef,
      selectTagEleHeight,
      isShowClearIcon,
      handleFocus,
      handleMouse,
      handleClear,
      handleTagClose,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/select.less';
</style>
