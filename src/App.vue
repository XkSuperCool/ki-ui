<template>
  <div class='app'>
    {{name}}<br>
    <ki-input style='width: 300px;' placeholder='请输入您的名称' v-model='name' clearable suffix-icon='grav' prefix-icon="grav">
      <template v-slot:suffix-icon>
        <span>1</span>
      </template>
      <template v-slot:prefix-icon>
        <span>1</span>
      </template>
    </ki-input>
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
