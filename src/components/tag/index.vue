<template>
  <div class='ki-tag' :class='tagClass' v-if='isClose' :style='{backgroundColor: color}'>
    <slot></slot>
    <div class='ki-tag-close' v-if='closable' @click='handleClose'>×</div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, PropType, computed, ref,
} from 'vue';

import { ComponentSize, StatusType } from '@/types/common';

type TagSize = ComponentSize | 'mini';

export default defineComponent({
  name: 'Tag',
  props: {
    type: {
      type: String as PropType<StatusType>,
    },
    size: {
      type: String as PropType<TagSize>,
      default: 'medium',
    },
    closable: Boolean,
    color: String,
  },
  emits: ['on-close'],
  setup(props, { emit }) {
    const isClose = ref(true);
    const tagClass = computed(() => [
      props.type ? props.type : 'primary',
      props.size,
    ]);

    // 关闭
    const handleClose = () => {
      emit('on-close');
      isClose.value = false;
    };

    return {
      tagClass,
      isClose,
      handleClose,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
