<template>
  <div class='app'>
    <div class='title'>按钮：</div>
    <div class='btns'>
      <Button @click='onClick' icon='plane'>
        default-icon
      </Button>
      <Button @click='onClick' icon='address-book' round type='success'>
        round-success
      </Button>
      <Button @click='onClick' icon='search' circular>
        circular
      </Button>
      <Button @click='onClick' size='small' type='primary'>
        small
      </Button>
      <Button @click='onClick' type='warning'>
        medium
      </Button>
      <Button @click='onClick' size='large' type='error' round>
        large
      </Button>
      <Button @click='onClick' size='small' icon='close' disabled>
      </Button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Button from './components/button/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    Button,
  },
  setup() {
    return {
      onClick() {
        console.log('onClick');
      },
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
</style>
