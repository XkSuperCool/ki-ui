<template>
  <div class='ki-carousel'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'Carousel',
  setup() {
    return {
    };
  },
});
</script>

<style scoped lang='less'>
  @import 'style/carousel.less';
</style>
