<template>
  <div class='ki-carousel' ref='carouselRef'>
    <div :style='{height: height}'>
      <slot></slot>
      <Transition name='fade'>
        <div v-if='isShowControllerButton'>
          <Button @click='prevCarouse' size='small' class='ki-c-prev-btn' circular icon='angle-left' />
          <Button @click='nextCarouse' size='small' class='ki-c-next-btn' circular icon='angle-right' />
        </div>
      </Transition>
    </div>
    <ul class='control-point'>
      <li
        v-for='(item, index) in items'
        :key='item.uid'
        :class='{active: activeIndex === index}'
        @click='handleClickControlPoint(index)'
      >
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  provide,
  ref,
  onMounted,
  onBeforeUnmount,
  Transition,
  watch,
  toRef,
} from 'vue';
import type { ComponentInternalInstance, PropType, Ref } from 'vue';
import Button from '../button';
import type { CarouselInstance } from './carousel-item.vue';

export const CAROUSEL_INSTANCE = Symbol.for('carousel_instance');
export interface Carousel {
  addItem: (instance: CarouselInstance) => void;
  items: ComponentInternalInstance[];
  initialIndex: Ref<number>;
}

export default defineComponent({
  name: 'Carousel',
  props: {
    autoplay: Boolean,
    height: {
      type: String,
      default: '300px',
    },
    arrow: {
      type: String as PropType<'hover' | 'always' | 'never'>,
      default: 'hover',
    },
    interval: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Button,
    Transition,
  },
  setup(props) {
    const items = reactive<CarouselInstance[]>([]);
    const addItem = (instance: CarouselInstance) => items.push(instance);

    const activeIndex = ref(props.initialIndex);
    let flag = true;
    // 下一个
    const nextCarouse = () => {
      if (flag) {
        flag = false;
        setTimeout(() => {
          if (activeIndex.value === (items.length - 1)) {
            activeIndex.value = 0;
          } else {
            activeIndex.value += 1;
          }
          items.forEach((item) => {
            item.ctx.toggleCarouse(activeIndex.value, 'left');
          });
          flag = true;
        }, 200);
      }
    };
    // 上一个
    const prevCarouse = () => {
      if (flag) {
        flag = false;
        setTimeout(() => {
          if (activeIndex.value === 0) {
            activeIndex.value = items.length - 1;
          } else {
            activeIndex.value -= 1;
          }
          items.forEach((item) => {
            item.ctx.toggleCarouse(activeIndex.value, 'right');
          });
          flag = true;
        }, 200);
      }
    };
    // 将事件组合为一个对象，方便调用
    const event = { nextCarouse, prevCarouse };
    // 点击控制点
    const handleClickControlPoint = (index: number) => {
      if (activeIndex.value !== index) {
        const diff = Math.abs(index - activeIndex.value);
        const eventName = index > activeIndex.value ? 'nextCarouse' : 'prevCarouse';
        event[eventName]();
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < (diff - 1); i++) {
          // 延时后续调用，时间比 nextCarouse/prevCarouse 要长一点，使其前面的动画能先完成
          setTimeout(event[eventName], 350 * (i + 1));
        }
      }
    };
    // 监听 initialIndex
    watch(toRef(props, 'initialIndex'), (value: number) => {
      if (value < items.length) {
        handleClickControlPoint(value);
      }
    });

    provide<Carousel>(CAROUSEL_INSTANCE, {
      addItem,
      items,
      initialIndex: toRef(props,'initialIndex'),
    });

    let autoPlayTimerId = 0;
    const carouselRef = ref<HTMLDivElement | null>(null);
    const autoplay = () => {
      if (props.autoplay) {
        autoPlayTimerId = setTimeout(() => {
          nextCarouse();
          autoplay();
        }, props.interval);
      }
    };

    const isShowControllerButton = ref(props.arrow === 'always'); // 是否显示控制按钮
    watch(toRef(props, 'arrow'), (value: 'hover' | 'always' | 'never') => {
      isShowControllerButton.value = value === 'always';
    });
    const carouselRefMouseenter = () => {
      clearTimeout(autoPlayTimerId);
      if (props.arrow === 'hover') {
        isShowControllerButton.value = true;
      }
    };
    const carouselRefMouseLeave = () => {
      autoplay();
      if (props.arrow === 'hover') {
        isShowControllerButton.value = false;
      }
    };

    onMounted(() => {
      autoplay();
      if (carouselRef.value) {
        carouselRef.value.addEventListener('mouseenter', carouselRefMouseenter);
        carouselRef.value.addEventListener('mouseleave', carouselRefMouseLeave);
      }
    });

    onBeforeUnmount(() => {
      if (carouselRef.value) {
        carouselRef.value.removeEventListener('mouseenter', carouselRefMouseenter);
        carouselRef.value.removeEventListener('mouseleave', carouselRefMouseLeave);
      }
    });

    return {
      items,
      activeIndex,
      carouselRef,
      isShowControllerButton,
      nextCarouse,
      prevCarouse,
      handleClickControlPoint,
    };
  },
});
</script>

<style scoped lang='less'>
  @import 'style/carousel.less';
</style>
