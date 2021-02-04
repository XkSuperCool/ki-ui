<template>
  <div>
    <table class='ki-calendar-table' :cellspacing='0' :cellpadding='0'>
      <thead>
        <th v-for='weekItem in weeks' :key='weekItem'>
          {{weekItem}}
        </th>
      </thead>
      <tbody>
        <tr v-for='(_, idx) in Array(rowNum)' :key='idx'>
          <td v-for='(_, index) in Array(columnNum)' :key='index'>
            <div class='ki-calendar-day'>
              {{index + 1 + (idx * 7) > lastDay ? '' : index + 1 + (idx * 7)}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'Calendar',
  setup() {
    const rowNum = 5;
    const columnNum = 7;
    const weeks = ['一', '二', '三', '四', '五', '六', '日'];
    const lastDay = ref(0);
    const currentMonthFirstDayWeek = ref(1);

    /**
     * 获取当前月份的最后一天
     */
    const getCurrentMonthLastDay = () => {
      const year = dayjs().year().toString();
      const month = parseInt(dayjs().month().toString(), 10) + 2;
      return {
        day: +dayjs(`${year}-${month}-0`).date().toString(),
        week: dayjs(`${year}-${month}-1`).day(),
      };
    };

    onMounted(() => {
      const { day, week } = getCurrentMonthLastDay();
      lastDay.value = day;
      currentMonthFirstDayWeek.value = week;
    });

    return {
      rowNum,
      columnNum,
      weeks,
      lastDay,
      currentMonthFirstDayWeek,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
