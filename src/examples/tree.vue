<template>
  <div class='ki-tree'>
    <ki-tree />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Tree } from '@/components';

export default defineComponent({
  name: 'TreeExample',
  components: {
    KiTree: Tree,
  },
});
</script>

<style scoped lang='less'>
</style>
