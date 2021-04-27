<template>
  <div class='ki-option-group'>
    <div class='label'>{{label}}</div>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ki-option-group',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang='less'>
  @import './style/option-group.less';
</style>
