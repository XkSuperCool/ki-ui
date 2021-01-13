<template>
  <div class='app'>
    {{name}}<br>
    <ki-input size='mini' style='width: 300px;'>
      <template v-slot:append>231</template>
      <template v-slot:prepend>231</template>
    </ki-input>
    <ki-input size='small' style='width: 300px;'>
      <template v-slot:append>231</template>
    </ki-input>
    <ki-input style='width: 300px;'>
      <template v-slot:append>231</template>
    </ki-input>
    <ki-input style='width: 300px;' type='text' size='large' v-model='name' show-password clearable :maxLength="16" show-word-limit>
      <template v-slot:append>231</template>
    </ki-input>
    <ki-input type='textarea'></ki-input>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  Input,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    KiInput: Input,
  },
  setup() {
    const name = ref();
    return {
      name,
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

  .tags > div {
    margin-right: 3px;
  }
</style>
