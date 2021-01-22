<template>
  <div class='app'>
    {{appName}}
    <div style='width: 700px; margin: 0 auto;'>
      <carousel height='300px' :initial-index='2' autoplay direction='vertical'>
        <carousel-item style='height: 300px' v-for='value in list' :key='value.id' class='item'>
          <img :src='value.path' />
        </carousel-item>
      </carousel>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Carousel,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Carousel,
    CarouselItem: Carousel.Item,
  },
  setup() {
    const appName = ref('app');

    return {
      appName,
      list: [
        {
          id: 1,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 2,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 3,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 4,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 5,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 6,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 7,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
        {
          id: 8,
          path: `https://picsum.photos/700/300?random=${Math.floor(Math.random() * 200 + 1)}`,
        },
      ],
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .item {
    color: #000;
    background-color: #a8a6a6;
  }
</style>
