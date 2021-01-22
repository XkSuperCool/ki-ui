<template>
  <div class='ki-carousel-item' ref='carouselItemRef' :style='style' :class='domClass'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  inject,
  ref,
  reactive,
} from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { CAROUSEL_INSTANCE } from './carousel.vue';
import type { Carousel } from './carousel.vue';

export type CarouselInstance = ComponentInternalInstance & {
  ctx: {
    toggleCarouse: (idx: number, direction: 'left' | 'right') => void;
  };
}

export default defineComponent({
  name: 'CarouselItem',
  setup() {
    const instance = getCurrentInstance() as CarouselInstance;
    const style = reactive<Partial<CSSStyleDeclaration>>({});
    const domClass = reactive<string[]>([]);
    const index = ref(0);

    // inject
    const carouseInstance = inject<Carousel>(CAROUSEL_INSTANCE);

    const setTranslateX = (value: number, flag = '+') => {
      if (flag === '-') {
        style.transform = `translateX(-${value}%)`;
      } else if (flag === '+') {
        style.transform = `translateX(${value}%)`;
      }
    };

    const toggleCarouse = (idx: number, direction: 'left' | 'right') => {
      if (index.value === idx) {
        // 处理 active carouse
        setTranslateX(0);
        domClass[0] = 'transition';
      } else if (index.value === (idx - 1) || (idx === 0 && carouseInstance && (index.value === carouseInstance?.items.length - 1))) {
        // 处理 active carouse 的上一张，放置到其左侧
        domClass[0] = 'transition';
        if (direction === 'right') {
          domClass.pop();
        }
        setTranslateX(100, '-');
      } else if (index.value === (idx + 1) || ((idx + 1) === carouseInstance?.items.length && index.value === 0)) {
        // 处理 active carouse 的下一张，放置到其右侧
        domClass.pop();
        if (direction === 'right') {
          domClass[0] = 'transition';
        }
        setTranslateX(100);
      }
    };

    // 初始化
    const initialization = () => {
      if (carouseInstance && instance) {
        carouseInstance.addItem(instance);
      }
      index.value = carouseInstance?.items.findIndex((item) => item.uid === instance?.uid) as number;
      if (index.value && index.value > 0) {
        if (index.value === 1) {
          setTranslateX(100);
        } else {
          setTranslateX(100, '-');
        }
      }
    };

    onMounted(initialization);

    return {
      style,
      domClass,
      toggleCarouse,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style/carousel-item.less';
</style>
