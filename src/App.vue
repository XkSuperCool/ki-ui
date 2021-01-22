<template>
  <div class='app'>
    <upload action='https://jsonplaceholder.typicode.com/posts'>
      <Button type='primary' size='small'>点击上传</Button>
    </upload>
    <div style='width: 700px; margin: 0 auto;'>
      <carousel height='300px' :initial-index='2' autoplay>
        <carousel-item style='height: 300px' v-for='value in list' :key='value.id' class='item'>
          <img :src='value.path' alt='banner' />
        </carousel-item>
      </carousel>
    </div>
    <hr>
    <div style='width: 700px; margin: 0 auto;'>
      <carousel height='300px' :initial-index='2' autoplay direction='vertical'>
        <carousel-item style='height: 300px' v-for='value in list' :key='value.id' class='item'>
          <img :src='value.path' alt='banner' />
        </carousel-item>
      </carousel>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Carousel,
  Upload,
  Button,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Upload,
    Button,
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
