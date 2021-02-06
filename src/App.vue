<template>
  <div class='app'>
    <Calendar>
      <template #dateCell='{date}'>
        <div>
          {{date.day}}
          <p style='font-size: 12px; color: var(--success-color)' v-if='date.current'>
            天天开心
          </p>
          <div v-if='date.month === 6 && date.day === 6' style='font-size: 12px; color: red'>
            六月发发发
          </div>
        </div>
      </template>
    </Calendar>
    <Button>{{appName}}</Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Button,
  Calendar,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Button,
    Calendar,
  },
  setup() {
    const appName = ref('app');

    return {
      appName,
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .item {
    color: #000;
    background-color: #a8a6a6;
  }
</style>
