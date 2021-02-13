<template>
  <div class='header'>
    <div class='content'>
      KI-UI <span>/ Vue 3.x</span>
    </div>
  </div>
  <div class='container'>
    <ul class='menu'>
      <li
        v-for='item in components'
        :key='item.name'
        :class='{active: item.name === componentName}'
        @click='handleClick(item.name)'>
        {{item.title}}
      </li>
    </ul>
    <div class='content'>
      <component :is='componentName' v-if='componentName' :key='componentName' />
      <div v-else>
        Ki-UI 文档 ...
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';
import ButtonExample from './button.vue';
import IconExample from './icon.vue';

export default defineComponent({
  name: 'Examples',
  components: {
    ButtonExample,
    IconExample,
  },
  setup() {
    const componentName = ref('');
    const components = [
      {
        name: 'IconExample',
        title: 'Icon 图标',
      },
      {
        name: 'ButtonExample',
        title: 'Button 按钮',
      },
    ];
    const handleClick = (name: string) => {
      componentName.value = name;
      window.location.hash = `/${name}`;
    };
    onMounted(() => {
      // eslint-disable-next-line prefer-destructuring
      componentName.value = window.location.hash.split('/')[1];
    });
    return {
      components,
      componentName,
      handleClick,
    };
  },
});
</script>

<style scoped lang='less'>
  .header {
    .content {
      color: var(--primary-shallow-color);
      line-height: 80px;
      font-size: 20px;
      font-weight: bold;
      width: 1200px;
      height: 80px;
      margin: 0 auto 20px auto;
      border-bottom: 1px solid var(--border-color);

      span {
        color: var(--color-minor);
        font-size: 11px;
        font-weight: normal;
      }
    }
  }

  .scroll {
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 15px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      border: 5px solid transparent;
      box-shadow: 8px 0 0 var(--border-color) inset;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: transparent;
    }
  }

  .container {
    width: 1200px;
    min-height: calc(100vh - 80px - 25px);
    margin: 0 auto;
    display: flex;

    .menu {
      width: 20%;
      height: calc(100vh - 80px - 25px);
      overflow: auto;
      margin: 0 20px 0 0;
      padding: 0;
      list-style: none;
      border-right: 1px solid var(--border-color);
      .scroll();

      li {
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          color: var(--primary-color);
        }

        &.active {
          color: var(--primary-color);
        }
      }
    }

    .content {
      flex: 1;
      height: calc(100vh - 80px - 25px);
      overflow: hidden;
      .scroll();

      &:hover {
        overflow: auto;
      }
    }
  }
</style>
