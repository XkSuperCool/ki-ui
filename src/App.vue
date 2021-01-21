<template>
  <div class='app'>
    {{appName}}
    <div style='width: 700px; margin: 0 auto;'>
      <carousel autoplay>
        <carousel-item style='height: 300px' v-for='value in list' :key='value' class='item'>
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

    &:nth-of-type(2) {
      background-color: green;
    }
    &:nth-of-type(3) {
      background-color: slateblue;
    }
    &:nth-of-type(4) {
      background-color: deepskyblue;
    }
    &:nth-of-type(5) {
      background-color: indianred;
    }
  }
</style>
