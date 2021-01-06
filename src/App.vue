<template>
  <div class='app'>
    当前页：{{currentPage}}
    <pagination
      background
      :total='100'
      isTotal
      v-model:current-page='currentPage'
    />
    <button @click='change'>change</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Pagination } from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    Pagination,
  },
  setup() {
    const currentPage = ref(1);

    const change = () => {
      currentPage.value = Math.floor(Math.random() * 10 + 1);
    };

    return {
      currentPage,
      change,
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .title {
    margin: 5px 0;
  }

  .btns {
    .ki-btn {
      margin-right: 10px;
    }
  }

  .ki-alert {
    margin-bottom: 5px;
  }
</style>
