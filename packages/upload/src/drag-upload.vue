<template>
  <div
    class='ki-drag-upload'
    :class='{dragover: dragover, disabled: disabled}'
    @drop='handleDrop'
    @dragover='handleDragover'
    @dragleave.prevent='dragover = false'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DragUpload',
  props: {
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const dragover = ref(false);

    /**
     * 拖拽落下事件
     * @param e
     */
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      dragover.value = false;
      if (file && !props.disabled) {
        emit('change', file);
      }
    };

    /**
     * 拖拽事件
     * @param e
     */
    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
      if (!props.disabled) {
        dragover.value = true;
      }
    };

    return {
      dragover,
      handleDrop,
      handleDragover,
    };
  },
});
</script>

<style scoped>

</style>
