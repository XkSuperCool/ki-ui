<template>
  <div class='ki-carousel-item'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
} from 'vue';

export default defineComponent({
  name: 'CarouselItem',
  setup() {
    const instance = getCurrentInstance();
    onMounted(() => {
      console.log(instance);
    });
  },
});
</script>

<style scoped lang='less'>
  @import './style/carousel-item.less';
</style>
