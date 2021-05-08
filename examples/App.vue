<template>
  <div class='app'>
    <Header :data='config.header' :component-count='counter()' />
    <div class='main'>
      <div class='container'>
        <Menu :list='config.routers' />
        <div class='content'>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import Header from './components/header';
  import Menu from './components/menu';
  import config from './config';

  export default defineComponent({
    components: {
      Header,
      Menu,
    },
    setup() {
      const counter = () => {
        let value = 0;
        config.routers.slice(1).forEach((item) => {
          value += item.components.length;
        });
        return value;
      }
      return {
        config,
        counter,
      };
    },
  });
</script>

<style scoped lang='less'>
  .scroll {
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 15px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      border: 5px solid transparent;
      box-shadow: 10px 0 0 #ccc inset;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: transparent;
    }
  }

  .main {
    height: 97vh;
    overflow: auto;
    .scroll();

    .container {
      display: flex;
      margin: 0 auto;
    }

    .content {
      width: 70%;
      margin: 120px 0 40px 350px;
    }
  }
</style>
