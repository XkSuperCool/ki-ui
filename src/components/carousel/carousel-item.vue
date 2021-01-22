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
  nextTick,
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

    const setTranslate = (value: number, flag = '+') => {
      const direction = carouseInstance?.direction === 'horizontal' ? 'X' : 'Y';
      if (flag === '-') {
        style.transform = `translate${direction}(-${value}%)`;
      } else if (flag === '+') {
        style.transform = `translate${direction}(${value}%)`;
      }
    };

    const toggleCarouse = (idx: number, direction: 'left' | 'right') => {
      if (index.value === idx) {
        // 处理 active carouse
        setTranslate(0);
        domClass[0] = 'transition';
      } else if (index.value === (idx - 1) || (idx === 0 && carouseInstance && (index.value === carouseInstance?.items.length - 1))) {
        // 处理 active carouse 的上一张，放置到其左侧
        domClass[0] = 'transition';
        if (direction === 'right') {
          domClass.pop();
        }
        setTranslate(100, '-');
      } else if (index.value === (idx + 1) || ((idx + 1) === carouseInstance?.items.length && index.value === 0)) {
        // 处理 active carouse 的下一张，放置到其右侧
        domClass.pop();
        if (direction === 'right') {
          domClass[0] = 'transition';
        }
        setTranslate(100);
      }
    };

    // 初始化
    const initialization = () => {
      if (carouseInstance && instance) {
        carouseInstance.addItem(instance);
      }
      // 获取当前 item 所在的 index
      nextTick(() => {
        index.value = carouseInstance?.items.findIndex((item) => item.uid === instance?.uid) as number;
        if (index.value !== -1 && carouseInstance) {
          if (
            (carouseInstance?.initialIndex.value === 0 && index.value === 1) // initialIndex 为 0
            || index.value === carouseInstance?.initialIndex.value + 1 // initialIndex 不为 0， 且不是最后一张
            || (index.value === 0 && carouseInstance?.initialIndex.value === carouseInstance?.items.length - 1) // initialIndex 等于最后一张
          ) {
            setTranslate(100);
          } else if (index.value !== carouseInstance?.initialIndex.value) {
            // 其他
            setTranslate(100, '-');
          }
        }
      });
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
