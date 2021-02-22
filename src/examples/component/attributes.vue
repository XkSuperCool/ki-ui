<template>
  <div class='attribute'>
    <div class='title'>
      <template v-if='!title'>
        Attributes {{target !== 'attr' ? target.slice(0, 1).toUpperCase() + target.slice(1) : ''}}
      </template>
      <template v-else>{{title}}</template>
    </div>
    <table>
      <thead>
        <template v-if='!header.length'>
          <template v-if='target === "attr"'>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </template>
          <template v-if='target === "event"'>
            <th>事件名称</th>
            <th>说明</th>
            <th>回调函数</th>
          </template>
          <template v-if='target === "slot"'>
            <th>slot name</th>
            <th>说明</th>
          </template>
        </template>
        <template v-else>
          <th v-for='item in header' :key='item'>{{item}}</th>
        </template>
      </thead>
      <tbody>
        <tr v-for='(item, idx) in attributes' :key='idx'>
          <td v-for='key in Object.keys(item)' :key='key' style='maxWidth: 150px'>
            {{item[key]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Attribute',
  props: {
    attributes: {
      type: Array,
      default: () => [],
    },
    header: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    target: {
      type: String as PropType<'attr' | 'event' | 'slot'>,
      default: 'attr',
    },
  },
});
</script>

<style scoped lang='less'>
  .attribute {
    margin-bottom: 50px;

    .title {
      color: var(--color);
      font-size: 25px;
    }

    table {
      width: 100%;
      margin-top: 20px;

      thead th {
        color: var(--color-minor);
        font-weight: normal;
        font-size: 14px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 10px;
        padding-left: 5px;
        text-align: left;
      }

      tbody td {
        font-size: 14px;
        color: var(--color);
        padding: 15px 0 15px 5px;
        border-bottom: 1px solid var(--border-color);
      }
    }
  }
</style>
