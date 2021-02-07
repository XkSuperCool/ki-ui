<template>
  <label class='ki-radio'>
    <span class='ki-radio-inner'>
      <span class='ki-radio-input'></span>
      <input type='radio' />
    </span>
    <span class='ki-radio-label-text'><slot></slot></span>
  </label>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Radio',
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
