<template>
  <div class='app'>
    <Examples />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Examples from '@/examples/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    Examples,
  },
});
</script>
