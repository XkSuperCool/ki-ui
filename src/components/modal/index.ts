import { h, Teleport, defineComponent, watch, onMounted, onBeforeUnmount, Transition } from 'vue';
import type { PropType } from 'vue';
import Button from '../button';
import './style.less';

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: String,
    mask: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '40%',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    offset: {
      type: String,
      default: '20%',
    },
    beforeClose: {
      type: Function as PropType<(done: () => void) => void>,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    teleportBody: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: Boolean,
  },
  emits: ['update:modelValue', 'open', 'close', 'on-cancel', 'on-ok'],
  setup(props, { emit, slots }) {
    const handleClose = () => {
      if (props.beforeClose && typeof props.beforeClose === 'function') {
        props.beforeClose(() => {
          emit('update:modelValue', false);
        });
      } else {
        emit('update:modelValue', false);
      }
    };

    // 点击遮罩层隐藏 modal
    const handleClickMask = (event: MouseEvent) => {
      if ((event.target as HTMLDivElement)?.className === 'ki-modal mask') {
        handleClose();
      }
    };

    watch(props, (value) => {
      if (value.modelValue) {
        emit('open');
      } else {
        emit('close');
      }
    }, {
      immediate: true,
    });

    /**
     * 点击取消按钮
     */
    const handleOnCancel = () => {
      emit('on-cancel');
      handleClose();
    };

    /**
     * 点击确定按钮
     */
    const handleOnOk = () => {
      emit('on-ok');
    };

    /**
     * 键盘按下回调
     * @param event
     */
    const handleKeydown = (event: KeyboardEvent) => {
      if (props.modelValue) {
        if (event.key === 'Escape') {
          handleClose();
        }
      }
    };

    onMounted(() => {
      if (props.closeOnPressEscape) {
        window.addEventListener('keydown', handleKeydown);
      }
    });
    onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));

    return () => h(Transition, {name: 'fade'}, {
      default() {
        return props.modelValue ? h(Teleport, {
          to: 'body',
          disabled: !props.teleportBody,
        }, h('div', {
          class: [
            'ki-modal',
            props.mask ? 'mask' : '',
          ],
          style: {
            zIndex: props.zIndex,
          },
          onClick: handleClickMask,
        }, h('div', {
          class: 'ki-modal-main',
          style: {
            width: props.width,
            top: props.offset,
          },
        },[
          h('div', {
            class: 'ki-m-header'
          }, [
            h('div', {class: 'ki-h-title'}, props.title),
            props.showClose && h('span', {class: 'ki-h-close', onClick: handleClose}, '×'),
          ]),
          h('div', {class: 'ki-modal-content'}, slots.default && slots.default()),
          h('div', {class: 'ki-modal-footer'}, slots.footer ? slots.footer() :
            [
              h(Button, {style: 'margin-right: 8px;', onClick: handleOnCancel}, {default: () => props.cancelText}),
              h(Button, {type: 'primary', onClick: handleOnOk}, {default: () => props.okText}),
            ]
          ),
        ]))) : null
      },
    });
  },
});

