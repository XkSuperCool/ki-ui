import {defineComponent, h, PropType, ref, watchEffect, onUnmounted, reactive, getCurrentInstance} from 'vue';
import Icon from '../../icon';
import type { Options, Show, ImgPreview } from './img-preview.type.d';
import { evaluate } from 'mathjs';
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
    const isShowImgList = props.imgs.length > 0;

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

    // 切换上一张
    const handlePrev = () => {
      const activeIndex = index.value -= 1;
      index.value = activeIndex === -1 ? (imgs.value.length - 1) : activeIndex;
    };
    // 切换下一张
    const handleNext = () => {
      const activeIndex = index.value += 1;
      index.value = activeIndex === imgs.value.length ? 0 : activeIndex;
    };

    const changeImgNode = () => imgs.value.length >= 2 ? [
      h(Icon, {
        title: '上一张',
        type: 'angle-left',
        class: 'ki-preview-prev',
        onClick: handlePrev,
      }),
      h(Icon, {
        title: '下一张',
        type: 'angle-right',
        class: 'ki-preview-next',
        onClick: handleNext,
      }),
    ] : '';

    // 还原
    const handleRestore = () => {
      style.rotate = 0;
      style.scale = 1;
    };

    return () => h('div', {
      class: 'ki-img-preview',
    }, [
      isShowImgList ? h('div', {
        class: 'ki-img-list',
      }, imgs.value.map((url, index) => h('img', {
        src: url,
        style: {
          objectFit: 'cover',
        },
        onClick: () => show(imgs.value, index),
      }))) : '',
      (imgs.value.length > 0 && isPreview.value) ? h('div', {
        class: 'ki-preview-container',
      }, [
        h(Icon, {
          type: 'close',
          class: 'ki-preview-close',
          onClick: () => isPreview.value = false,
        }),
        changeImgNode(),
        h('div', {
          class: 'ki-preview-content',
        }, h('img', {
          style: {
            transform: `scale(${style.scale}) rotate(${style.rotate}deg)`,
          },
          src: imgs.value[index.value],
        })),
        h('div', {
          class: 'ki-preview-control',
        }, [
          h(Icon, {
            title: '放大',
            type: 'search-plus',
            onClick: () => style.scale = evaluate(`${style.scale} + ${options.scale}`),
          }),
          h(Icon, {
            title: '缩小',
            type: 'search-minus',
            onClick: () => style.scale = evaluate(`${style.scale} - ${options.scale}`),
          }),
          h(Icon, {
            title: '左旋转',
            type: 'rotate-left',
            onClick: () => style.rotate += -options.rotate,
          }),
          h(Icon, {
            title: '右旋转',
            type: 'rotate-right',
            onClick: () => style.rotate += options.rotate,
          }),
          h(Icon, {
            title: '还原',
            type: 'refresh',
            onClick: handleRestore,
          }),
        ]),
      ]) : '',
    ]);
  },
});
