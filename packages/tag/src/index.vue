<template>
  <div class='ki-tag' :class='[type, size]' v-if='isClose' :style='{backgroundColor: color, borderColor: color, color: color && fontColor}'>
    <slot></slot>
    <div class='ki-tag-close' v-if='closable' @click.stop='handleClose'>×</div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, PropType, ref,
} from 'vue';

import { ComponentSize, StatusType } from 'types/common';

export type TagSize = ComponentSize | 'mini';
export type TagType = StatusType | 'primary';

export default defineComponent({
  name: 'ki-tag',
  props: {
    type: {
      type: String as PropType<TagType>,
      default: 'primary',
    },
    size: {
      type: String as PropType<TagSize>,
      default: 'medium',
    },
    closable: Boolean,
    color: String,
    fontColor: {
      type: String,
      default: '#fff',
    },
  },
  emits: ['on-close'],
  setup(_, { emit }) {
    const isClose = ref(true);
    // 关闭
    const handleClose = () => {
      emit('on-close');
      isClose.value = false;
    };

    return {
      isClose,
      handleClose,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
