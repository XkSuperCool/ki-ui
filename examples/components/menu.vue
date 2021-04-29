<template>
  <div class='menu'>
    <ul class='list'>
      <li v-for='item in list' :key='item.groupName' class='li-item'>
        <div class='title'>
          {{item.groupName}}
        </div>
        <div class='link' v-for='link in item.components' :key='link.path' :class='{active: route.path === link.path}'>
          <router-link :to='link.path'>
            {{link.title}}
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { useRoute } from 'vue-router';
import type { RoutersItem } from '../config';

export default defineComponent({
  props: {
    list: Array as PropType<RoutersItem[]>,
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
});
</script>

<style lang='less'>
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

  .menu {
    width: 260px;
    overflow: hidden;
    margin-top: 80px;
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    border-right: 1px solid #f0f0f0;
    box-sizing: border-box;
    .scroll();

    &:hover {
      overflow: auto;
    }

    .list {
      list-style: none;
      padding: 0;
    }

    .li-item,
    .link a {
      color: #b2b2b4;
      font-size: 16px;
      text-decoration: none;
      line-height: 40px;
      display: block;
      padding-left: 30px;

      .title {
        font-size: 13px;
      }
    }

    .link a {
      color: #606266;
      padding-left: 0px;

      &:hover {
        color: #1890ff;
      }
    }

    .link.active a {
      color: #1890ff;
    }
  }
</style>