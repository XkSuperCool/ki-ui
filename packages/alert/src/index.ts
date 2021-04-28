import {
  defineComponent, h, PropType, ref, Transition,
} from 'vue';
import { StatusType } from 'types/common';
import Icon from 'packages/icon';
import './style.less';

export default defineComponent({
  name: 'ki-alert',
  props: {
    type: {
      type: String as PropType<StatusType>,
      default: 'success',
    },
    closable: Boolean,
    closeText: String,
    icon: Boolean, // 是否显示对应的 icon
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const isClose = ref(false);

    const handleClose = () => {
      isClose.value = true;
      emit('close');
    };

    // 状态对应的 icon
    const iconMap = {
      success: 'check-circle',
      error: 'times-circle',
      warning: 'exclamation-circle',
      info: 'info-circle',
    };

    return () => h(Transition, { name: 'fade' }, {
      default() {
        if (isClose.value) return null;
        return h('div', {
          class: [
            'ki-alert',
            props.type,
          ],
        }, [
          h('div', [
            props.icon && h(Icon, { type: iconMap[props.type] }),
            slots.default && slots.default(),
          ]),
          props.closable ? h('span', {
            class: 'close',
            onClick: handleClose,
          }, props.closeText ?? '×') : null,
        ]);
      },
    });
  },
});
