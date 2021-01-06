<template>
  <div class='ki-option'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Option',
});
</script>

<style scoped lang='less'>
  @import './option.less';
</style>
