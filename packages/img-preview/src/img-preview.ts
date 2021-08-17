import {defineComponent, h, PropType, ref, watchEffect, onUnmounted, reactive, getCurrentInstance} from 'vue';
import Icon from '../../icon';
import type { Options, Show, ImgPreview } from './img-preview.type.d';
import './style.less';

export default defineComponent({
  name: 'KiImgPreview',
  props: {
    imgs: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    scaleStep: {
      type: Number,
      default: 0.2,
    },
    rotateStep: {
      type: Number,
      default: 45,
    },
  },
  setup(props) {
    const imgs = ref<string[]>([]);
    const index = ref(0);
    const isPreview = ref(false);

    const unWatch = watchEffect(() => {
      imgs.value = props.imgs;
      index.value = props.activeIndex;
    });

    onUnmounted(() => {
      unWatch();
    });

    const style = reactive({
      scale: 1,
      rotate: 0,
    });

    const options = reactive<Options>({
      scale: props.scaleStep,
      rotate: props.rotateStep,
    });

    const show: Show = (urls, activeIndex, option) => {
      imgs.value = urls;
      index.value = activeIndex || 0;
      isPreview.value = true;
      if (option) {
        const { scale, rotate } = option;
        options.scale = scale;
        options.rotate = rotate;
      }
    };
    const instance = getCurrentInstance() as ImgPreview;
    instance.ctx.show = show;

    return () => h('div', {
      class: 'ki-img-preview',
    }, [
      (imgs.value.length > 0 && isPreview.value) ? h('div', {
        class: 'ki-preview-container',
      }, [
        h(Icon, {
          type: 'close',
          class: 'ki-preview-close',
          onClick: () => isPreview.value = false,
        }),
        h('div', {
          class: 'ki-preview-content',
        }, h('img', {
          style: `transform: scale(${style.scale}) rotate(${style.rotate}deg)`,
          src: imgs.value[index.value],
        })),
        h('div', {
          class: 'ki-preview-control',
        }, [
          h(Icon, { type: 'search-plus', onClick: () => style.scale += options.scale }),
          h(Icon, { type: 'search-minus', onClick: () => style.scale -= options.scale }),
          h(Icon, { type: 'rotate-left', onClick: () => style.rotate += -options.rotate }),
          h(Icon, { type: 'rotate-right', onClick: () => style.rotate += options.rotate }),
        ]),
      ]) : '',
    ]);
  },
});
