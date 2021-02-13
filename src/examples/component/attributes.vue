<template>
  <div class='attribute'>
    <div class='title'>
      Attributes
    </div>
    <table>
      <thead>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </thead>
      <tbody>
        <tr v-for='(item, idx) in attributes' :key='idx'>
          <td v-for='key in Object.keys(item)' :key='key'>
            {{item[key]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Attribute',
  props: {
    attributes: Array,
    default() {
      return [];
    },
  },
});
</script>

<style scoped lang='less'>
  .attribute {
    margin-bottom: 20px;

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
