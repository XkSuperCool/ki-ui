<template>
  <div class='ki-select' :class='{focus: focus}' @click.stop='focus = true'>
    <div class='content'>
      <input disabled value='北京' />
    </div>
    <div class='ki-options' v-if='focus'>
      <slot></slot>
    </div>
    <icon type='angle-down' class='arrow' />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import Icon from '../icon';

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
  },
  setup() {
    const focus = ref(false);
    // 取消 focus
    const chanceFocus = () => {
      focus.value = false;
    };

    onMounted(() => {
      document.addEventListener('click', chanceFocus);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', chanceFocus);
    });

    return {
      focus,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './select.less';
</style>
