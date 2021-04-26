<template>
  <div class='header-container'>
    <div class='left'>
      <div class='title'>
        {{data.title}}
      </div>
    </div>
  </div>
</template>
  
<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Header } from '../config';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Header>,
    },
  },
  setup() {
    return [];
  },
});
</script>

<style lang='less'>
  .header-container {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0px 3px 6px rgba(217, 217, 217, .4);
    box-sizing: border-box;
    background-color: #fff;
  }
</style>
