<template>
  <div
    class='ki-carousel-item'
    :style='itemStyle'
    :class='data.itemClass'
  >
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
} from 'vue';
import { InjectCarouselKey } from './carousel.vue';
import type { InjectCarouselValue } from './carousel.vue';

export interface TranslateItem {
  (index: number, actveIndex: number, oldIndex: number): void
}

export interface CarouselItem {
  uid: number;
  translateItem: TranslateItem;
}

export default defineComponent({
  name: 'ki-carousel-item',
  setup() {
    const instance = getCurrentInstance();
    const data = ref<{
      itemTranslate: number,
      itemClass: string,
    }>({
      itemTranslate: 0,
      itemClass: '',
    });

    const carouselInstance = inject<InjectCarouselValue>(InjectCarouselKey);

    // 计算移动距离
    const computedTranslate = (index: number, actveIndex: number): number => {
      const {
        direction, offsetHeight, offsetWidth, items,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = carouselInstance!;
      const offset = direction.value === 'horizontal' ? offsetWidth.value : offsetHeight.value;
      const { length } = items.value;
      let value;
      if (index === actveIndex) {
        value = 0;
      } else if (index === 0 && actveIndex === length - 1) {
        value = offset;
      } else if (index === length - 1 && actveIndex === 0) {
        value = -offset;
      } else if (index < actveIndex) {
        value = -(actveIndex - index) * offset;
      } else {
        value = (index - actveIndex) * offset;
      }
      return value;
    };

    // 移动过渡效果
    const translateTransation = (index: number, actveIndex: number, oldIndex: number) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { length } = carouselInstance!.items.value;
      const lastIndex = length - 1;
      // 是不是最后一个 item 或 第一个 item
      const isFirstItemOrLastItem = index === lastIndex || index === 0;
      // 给当前 item 和前一个 item 添加过渡效果
      const isTransation = (index === actveIndex || (index === oldIndex));
      // 是否切换的是下一张
      const isNext = actveIndex > oldIndex || (oldIndex === lastIndex && actveIndex === 0);
      if (isNext) {
        if (
          isTransation || (
            // 如果是最后一张切换第一张，那么就找到这两个 item 并添加动画过渡效果
            (oldIndex === lastIndex && actveIndex === 0) && isFirstItemOrLastItem
          )
        ) {
          data.value.itemClass = 'ki-carousel-transation';
        } else {
          data.value.itemClass = '';
        }
        return;
      }
      if (
        isTransation || (
          // 如果是第一张切换最后一张，那么就找到这两个 item 并添加动画过渡效果
          (oldIndex === 0 && actveIndex === lastIndex) && isFirstItemOrLastItem
        )
      ) {
        data.value.itemClass = 'ki-carousel-transation';
      } else {
        data.value.itemClass = '';
      }
    };

    const translateItem: TranslateItem = (index, actveIndex, oldIndex) => {
      data.value.itemTranslate = computedTranslate(index, actveIndex);
      translateTransation(index, actveIndex, oldIndex);
    };

    const itemStyle = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const direction = carouselInstance!.direction.value === 'horizontal' ? 'X' : 'Y';
      return {
        transform: `translate${direction}(${data.value.itemTranslate}px)`,
      };
    });

    onMounted(() => {
      if (carouselInstance) {
        carouselInstance.addItem({
          uid: instance?.uid as number,
          translateItem,
        });
      }
    });

    return {
      data,
      itemStyle,
    };
  },
});
</script>

<style lang='less'>
  .ki-carousel-item {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    position: absolute;
  }

  .ki-carousel-item.ki-carousel-transation {
    transition: transform 300ms linear;
  }
</style>
