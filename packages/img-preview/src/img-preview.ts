import {
  defineComponent, h, PropType, ref, watchEffect, onUnmounted,
  reactive, getCurrentInstance,
} from 'vue';
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
      rotateZ: 0,
      rotateY: 0,
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
      handleResetPosition();
    };
    // 切换下一张
    const handleNext = () => {
      const activeIndex = index.value += 1;
      index.value = activeIndex === imgs.value.length ? 0 : activeIndex;
      handleResetPosition();
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
      style.rotateZ = 0;
      style.rotateY = 0;
      style.scale = 1;
      handleResetPosition();
    };

    // 图片拖动
    // todo: bug 1. 图片放大导致 container 比他小事件触发范围应该和图片一样大
    const containerRef = ref<HTMLImageElement>();
    // 记录位置信息
    const position = {
      mouseX: 0,
      mouseY: 0,
      imgX: 0,
      imgY: 0,
    };
    let flag = false;
    // 还原位置信息
    const handleResetPosition = () => {
      if (containerRef.value) {
        containerRef.value.style.transform = 'translate(0, 0)';
        position.imgX = position.imgY = 0;
      }
    };
    // 鼠标按下记录当前鼠标位置，flag 设置为 true
    const handleMousedown = (event: MouseEvent) => {
      event.preventDefault();
      const { clientY, clientX } = event;
      position.mouseX = clientX;
      position.mouseY = clientY;
      flag = true;
    };
    // 关闭 flag = false
    const handleMouseup = () => {
      flag = false;
      if (containerRef.value) {
        containerRef.value.style.cursor = 'grab';
        position.imgX = middlePosition.x;
        position.imgY = middlePosition.y;
      }
    }
    // 中间变量：基于图片的 translate 位置，使其下一次鼠标按下进行拖动时能平滑衔接
    const middlePosition = {
      x: 0,
      y: 0,
    };
    // 只有 flag = true 时才进行图片移动操作
    const handleMousemove = (event: MouseEvent) => {
      event.preventDefault();
      if (!flag) return;
      const { clientY, clientX } = event;
      const { mouseX, mouseY, imgY, imgX } = position;
      // 获取最新的位置
      const x = clientX - mouseX + imgX;
      const y = clientY - mouseY + imgY;
      const container = containerRef.value;
      if (container) {
        // 拖动修改图片 translate 实现图片移动
        container.style.cursor = 'grabbing';
        container.style.transform = `translate(${x}px, ${y}px)`;
      }
      // 记录当前图片的 translate 位置
      middlePosition.x = x;
      middlePosition.y = y;
    };

    return () => h('div', {
      class: 'ki-img-preview',
    }, [
      isShowImgList ? h('div', {
        class: 'ki-img-list',
      }, imgs.value.map((url, index) => h('div', {
        class: 'ki-img-item',
      }, [
        h('img', {
          src: url,
          style: {
            objectFit: 'cover',
          },
        }),
        h('div', {
          class: 'ki-img-mask',
          onClick: () => show(imgs.value, index),
        }, h(Icon, {
          type: 'search-plus',
          style: {
            fontSize: '18px',
          },
        })),
      ]))) : '',
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
          ref: containerRef,
          onMousedown: handleMousedown,
          onMousemove: handleMousemove,
          onMouseup: handleMouseup,
          onMouseleave: handleMouseup, // 鼠标离开时也关闭拖动，避免鼠标拖动离开页面无法触发 mouseup 事件带来的 bug
        }, h('img', {
          style: {
            transform: `scale(${style.scale}) rotateZ(${style.rotateZ}deg) rotateY(${style.rotateY}deg)`,
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
            onClick: () => {
              const scale = evaluate(`${style.scale} - ${options.scale}`);
              if (scale >= 0.2) {
                style.scale = scale;
              }
            },
          }),
          h(Icon, {
            title: '左旋转',
            type: 'rotate-left',
            onClick: () => style.rotateZ += -options.rotate,
          }),
          h(Icon, {
            title: '右旋转',
            type: 'rotate-right',
            onClick: () => style.rotateZ += options.rotate,
          }),
          h(Icon, {
            title: '还原',
            type: 'refresh',
            onClick: handleRestore,
          }),
          h(Icon, {
            title: '反转',
            type: 'arrows-h',
            onClick: () => style.rotateY = style.rotateY === 0 ? 180 : 0,
          })
        ]),
      ]) : '',
    ]);
  },
});
