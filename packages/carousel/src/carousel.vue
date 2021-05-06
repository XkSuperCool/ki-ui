<template>
  <div
    ref='root'
    class='ki-carousel-root'
    @mouseenter='handleMouseenter'
    @mouseleave='handleMouseleace'
  >
    <div
      v-if='arrow !== "never" && direction !== "vertical"'
      :class='{hiddenArrow: hiddenArrow && arrow === "hover"}'
    >
      <div @click='prev' class='arrow left-arrow'>
        <ki-icon type='angle-left' />
      </div>
      <div @click='next' class='arrow right-arrow'>
        <ki-icon type='angle-right' />
      </div>
    </div>
    <div class='ki-carousel' :style='{height: height}'>
      <slot></slot>
    </div>
    <ul class='control-point' :class='{vertical: direction === "vertical"}'>
      <li
        v-for='(item, index) in items'
        :key='item.uid'
        :class='{active: activeIndex === index}'
        @mouseenter='handleToggleCarousel(index)'
      />
    </ul>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  provide,
  onMounted,
  watch,
  toRef,
} from 'vue';
import type { Ref, PropType } from 'vue';
import type { CarouselItem } from './carousel-item.vue';
import { throttle } from '@/utils';
import Icon from 'packages/icon';

type Direction = 'horizontal' | 'vertical';
export const InjectCarouselKey = Symbol.for('Carousel');
export interface InjectCarouselValue {
  items: Ref<CarouselItem[]>,
  addItem: (item: CarouselItem) => void;
  offsetWidth: Ref<number>;
  offsetHeight: Ref<number>;
  direction: Ref<Direction>,
}

export default defineComponent({
  name: 'ki-carousel',
  props: {
    height: String,
    autoplay: Boolean,
    interval: {
      type: Number,
      default: 3000,
    },
    arrow: {
      type: String as PropType<'hover' | 'always' | 'never'>,
      default: 'hover',
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
  },
  components: {
    Icon,
  },
  setup(props) {
    const root = ref<HTMLDivElement | null>(null);
    const activeIndex = ref(0);
    const items = ref<CarouselItem[]>([]);

    const setActiveItem = (current: number) => {
      items.value.forEach((element, index) => {
        element.translateItem(index, current, activeIndex.value);
      });
      activeIndex.value = current;
    };

    const addItem = (item: CarouselItem) => {
      items.value.push(item);
    };

    const next = throttle(() => {
      let index = activeIndex.value + 1;
      if (index >= items.value.length) {
        index = 0;
      }
      setActiveItem(index);
    }, 300);

    const prev = throttle(() => {
      let index = activeIndex.value - 1;
      if (index < 0) {
        index = items.value.length - 1;
      }
      setActiveItem(index);
    }, 300);

    const handleToggleCarousel = (index: number) => {
      setActiveItem(index);
    };

    // 自动轮播
    let timer: NodeJS.Timeout | null = null;
    const autoplay = () => {
      timer = setTimeout(() => {
        next();
        autoplay();
      }, props.interval);
    };
    watch(() => props.autoplay, (value) => {
      if (value) {
        autoplay();
      } else {
        clearTimeout(timer!);
      }
    });

    // 轮播宽高
    const offsetWidth = ref(0);
    const offsetHeight = ref(0);
    const getWidthAndHeight = () => {
      if (root.value) {
        offsetWidth.value = root.value.offsetWidth;
        offsetHeight.value = root.value.offsetHeight;
      }
    };
    watch(() => props.height, () => {
      getWidthAndHeight();
    });

    // 控制箭头显隐，移入停止自动轮播，移出开启自动轮播
    const hiddenArrow = ref(true);
    const handleMouseenter = () => {
      hiddenArrow.value = false;
      if (props.autoplay) {
        clearTimeout(timer!);
      }
    };
    const handleMouseleace = () => {
      hiddenArrow.value = true;
      if (props.autoplay) {
        autoplay();
      }
    };

    onMounted(() => {
      getWidthAndHeight();
      const { initialIndex } = props;
      const index = initialIndex >= 0 && initialIndex <= items.value.length - 1 ? initialIndex : 0;
      setActiveItem(index);
      if (props.autoplay) {
        autoplay();
      }
    });

    // provide
    provide<InjectCarouselValue>(InjectCarouselKey, {
      items,
      addItem,
      offsetWidth,
      offsetHeight,
      direction: toRef(props, 'direction'),
    });

    return {
      root,
      items,
      activeIndex,

      next,
      prev,
      handleToggleCarousel,

      hiddenArrow,
      handleMouseenter,
      handleMouseleace,
    };
  },
});
</script>

<style lang='less'>
  .ki-carousel-root {
    position: relative;

    .arrow {
      width: 40px;
      height: 40px;
      position: absolute;
      background-color: rgba(0, 0, 0, .2);
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color .3s;
      text-align: center;

      &:hover {
        background-color: rgba(0, 0, 0, .6);
      }

      .fa {
        color: hsla(0,0%,100%,.6);
        font-size: 32px;
        line-height: 40px;
      }
    }

    .arrow.left-arrow {
      left: 2%;

      .fa {
        margin-left: -4px;
      }
    }

    .arrow.right-arrow {
      right: 2%;

      .fa {
        margin-right: -4px;
      }
    }

    .control-point {
      width: 60%;
      display: flex;
      list-style: none;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);
      margin: 0;
      padding: 0;
      justify-content: center;

      li {
        width: 10%;
        height: 2px;
        margin-right: 10px;
        padding: 3px 0;
        cursor: pointer;

        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background-color: #fff;
          opacity: .4;
        }
      }

      li.active::after {
        opacity: 1;
      }

      li:last-child {
        margin-right: 0;
      }
    }

    .control-point.vertical {
      width: auto;
      height: 60%;
      left: initial;
      right: 20px;
      bottom: 50%;
      transform: translate(0, 50%);
      flex-direction: column;

      li {
        width: 2px;
        height: 10%;
        padding: 0 3px;
        margin-right: 0;
        margin-bottom: 10px;
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    .hiddenArrow {
      display: none;
    }
  }

  .ki-carousel {
    overflow: hidden;
    position: relative;
  }
</style>
