import { defineComponent, h, computed, ref } from 'vue';
import type { PropType } from 'vue';
import './style.less';

type ValueType = string | number | boolean;

export default defineComponent({
  name: 'ki-switch',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      required: true,
    },
    width: {
      type: Number,
      default: 40,
    },
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    activeText: String,
    inactiveText: String,
    activeValue: [Boolean, String, Number],
    inactiveValue: [Boolean, String, Number],
    beforeChange: Function as PropType<() => boolean | Promise<void>>,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    // 是否自定义了 value
    const isCustomerValue = computed(() => {
      return !!props.activeValue && !!props.inactiveValue;
    });

    // 是否是 active 状态
    const isActive = computed(() => {
      if (isCustomerValue.value) {
        return props.modelValue === props.activeValue;
      }
      return props.modelValue;
    });

    const loading = ref(false);
    // 是否可以切换
    const isSwitch = async () => {
      if (props.beforeChange) {
        loading.value = true;
        let isSwitch: boolean;
        try {
          const result = await props.beforeChange();
          isSwitch = typeof result === 'boolean' ? result : true;
        } catch {
          isSwitch = false;
        }
        loading.value = false;
        return isSwitch;
      }
      return true;
    }

    // 点击事件
    const handleOnClick = async () => {
      if (props.disabled || loading.value || !await isSwitch()) {
        return;
      }
      let value: ValueType;
      if (isCustomerValue.value) {
        value = (props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue) as ValueType;
      } else {
        value = !props.modelValue
      }
      emit('update:modelValue', value);
      emit('change', value);
    };

    return () => h('div', {
      class: `ki-switch ${isActive.value && 'active'} ${(props.disabled || loading.value)&& 'disabled'}`,
    }, [
      !!props.inactiveText && h('span', {
        class: 'ki-switch-text'
      }, props.inactiveText),
      h('div', {
        class: 'ki-switch-core',
        style: {
          width: `${props.width}px`,
          backgroundColor: isActive.value ? props.activeColor : props.inactiveColor,
        },
        onClick: handleOnClick,
      }, [
        h('div', {
          class: 'ki-switch-control-point',
        }),
      ]),
      !!props.activeText && h('span', {
        class: 'ki-switch-text',
      }, props.activeText),
    ]);
  },
});
