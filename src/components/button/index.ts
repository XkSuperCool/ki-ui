import { defineComponent, h, PropType } from 'vue';
import { ComponentSize } from '@/types/common';
import Icon from '../icon';
import './style.less';

export type ButtonType = 'primary' | 'success' | 'error' | 'warning';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<ButtonType>,
    },
    size: {
      type: String as PropType<ComponentSize>,
      default: 'medium',
    },
    icon: String, // icon 图标
    round: Boolean, // 是否圆角
    disabled: Boolean, // 是否禁用
    circular: Boolean, // 圆形按钮
  },
  setup(props, { slots }) {
    return () => h('button', {
      class: [
        'ki-btn',
        props.type,
        props.size,
        props.round ? 'round' : '',
        props.circular ? 'circular' : '',
      ],
      disabled: props.disabled,
      type: 'button',
    }, [
      props.icon && h(Icon, { type: props.icon }),
      h('span', { class: 'ki-btn-text' }, slots.default && !props.circular ? slots.default() : '',)
    ]);
  },
});
