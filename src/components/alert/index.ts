import {
  defineComponent, h, PropType, ref, Transition,
} from 'vue';
import Icon from '../icon';
import './style.less';

export type AlertType = 'success' | 'info' | 'error' | 'warning';

export default defineComponent({
  name: 'Alert',
  props: {
    type: {
      type: String as PropType<AlertType>,
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

    const iconType = ref('');
    switch (props.type) {
      case 'success':
        iconType.value = 'check-circle';
        break;
      case 'error':
        iconType.value = 'times-circle';
        break;
      case 'warning':
        iconType.value = 'exclamation-circle';
        break;
      case 'info':
        iconType.value = 'info-circle';
        break;
      default: break;
    }

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
            props.icon && h(Icon, { type: iconType.value }),
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
