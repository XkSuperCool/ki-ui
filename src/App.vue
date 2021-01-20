<template>
  <div class='app'>
    {{appName}}
    <div style='width: 400px'>
      <carousel>
        <div></div>
        <carousel-item style='height: 100px' v-for='value in list' :key='value' class='item'>
          {{value}}
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
      list: [1, 2, 3, 4, 5],
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
    background-color: grey;
  }
</style>
