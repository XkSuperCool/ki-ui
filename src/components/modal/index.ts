import { h, Teleport, defineComponent, watch } from 'vue';
import './style.less';

export default defineComponent({
  name: 'Modal',
  props: {
    visible: {
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
  },
  emits: ['update:visible', 'before-close', 'open', 'close'],
  setup(props, { emit, slots }) {
    const handleClose = () => {
      // TODO: 未判断是否传递了 before-close 参数
      emit('before-close', () => {
        emit('update:visible', false);
      });
    };

    // 点击遮罩层隐藏 modal
    const handleClickMask = (event: MouseEvent) => {
      if ((event.target as any)?.className === 'ki-modal mask') {
        emit('update:visible', false);
      }
    };

    watch(props, (value) => {
      if (value.visible) {
        emit('open');
      } else {
        emit('close');
      }
    }, {
      immediate: true,
    });

    return () => props.visible ? h(Teleport, {
      to: 'body',
    }, h('div', {
      class: [
        'ki-modal',
        props.mask ? 'mask' : '',
      ],
      onClick: handleClickMask,
    }, h('div', {
      class: 'ki-modal-main',
      style: {
        width: props.width,
      },
    },[
      h('div', {
        class: 'ki-m-header'
      }, [
        h('div', {class: 'ki-h-title'}, props.title),
        props.showClose && h('span', {class: 'ki-h-close', onClick: handleClose}, '×'),
      ]),
      h('div', {class: 'ki-modal-content'}, slots.default && slots.default()),
      h('div', {class: 'ki-modal-footer'}, slots.footer && slots.footer()),
    ]))) : null;
  },
});

