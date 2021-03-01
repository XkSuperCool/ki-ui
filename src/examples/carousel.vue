<template>
  <div>
    <Container
      title='基本使用'
    >
      <ki-carousel>
        <ki-carousel-item v-for='item in imgs' :key='item.url'>
          <img :src='item.url' alt='.' height='' />
        </ki-carousel-item>
      </ki-carousel>
    </Container>
    <Container
      title='自动播放'
    >
      <ki-carousel autoplay>
        <ki-carousel-item v-for='item in imgs' :key='item.url'>
          <img :src='item.url' alt='.' height='' />
        </ki-carousel-item>
      </ki-carousel>
    </Container>
    <Container
      title='切换箭头'
      sub-title='控制切换箭头的显示时机'
    >
      <ki-carousel autoplay arrow='always'>
        <ki-carousel-item v-for='item in imgs' :key='item.url'>
          <img :src='item.url' alt='.' height='' />
        </ki-carousel-item>
      </ki-carousel>
    </Container>
    <Container
      title='方向'
      sub-title='默认情况下，direction 为 horizontal。通过设置 direction 为 vertical 来让走马灯在垂直方向上显示。'
    >
      <ki-carousel autoplay direction='vertical'>
        <ki-carousel-item v-for='item in imgs' :key='item.url'>
          <img :src='item.url' alt='.' height='' />
        </ki-carousel-item>
      </ki-carousel>
    </Container>
    <Attributes :attributes='attributes' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Carousel } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'CarouselExample',
  components: {
    Container,
    Attributes,
    KiCarousel: Carousel,
    KiCarouselItem: Carousel.Item,
  },
  setup() {
    return {
      imgs: [
        {
          url: 'https://picsum.photos/900/300?random=1',
        },
        {
          url: 'https://picsum.photos/900/300?random=2',
        },
        {
          url: 'https://picsum.photos/900/300?random=3',
        },
        {
          url: 'https://picsum.photos/900/300?random=4',
        },
        {
          url: 'https://picsum.photos/900/300?random=5',
        },
      ],
      attributes: [
        {
          attribute: 'autoplay',
          description: '是否自动播放',
          type: 'boolean',
          option: 'true | false',
          default: 'false',
        },
        {
          attribute: 'height',
          description: '走马灯的高度',
          type: 'string',
          option: '——',
          default: '300px',
        },
        {
          attribute: 'arrow',
          description: '切换箭头的显示时机，hover: 移入显示，always: 一直显示, never: 不显示',
          type: 'hover | always | never',
          option: 'hover | always | never',
          default: 'hover',
        },
        {
          attribute: 'interval',
          description: '动画的切换时间',
          type: 'number',
          option: '——',
          default: '3000',
        },
        {
          attribute: 'initialIndex',
          description: '初始化时走马灯的位置',
          type: 'number',
          option: '——',
          default: '0',
        },
        {
          attribute: 'direction',
          description: '走马灯方向',
          type: 'horizontal | vertical',
          option: 'horizontal | vertical',
          default: 'horizontal',
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>
