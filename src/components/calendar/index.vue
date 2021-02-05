<template>
  <div>
    <slot name='header'>
      <div class='ki-calendar-header'>
        <div class='date'>
          {{currentDate.year}}年{{currentDate.month}}月
        </div>
        <div class='options'>
          <span @click='handleTogglePrevMonth' class='prev'>上个月</span>
          <span @click='handleToggleNextMonth' class='next'>下个月</span>
        </div>
      </div>
    </slot>
    <table class='ki-calendar-table' :cellspacing='0' :cellpadding='0'>
      <thead>
        <th v-for='weekItem in weeks' :key='weekItem'>
          {{weekItem}}
        </th>
      </thead>
      <tbody>
        <tr v-for='(_, rowIndex) in Array(rowNum)' :key='rowIndex'>
          <td
            v-for='(_, columnIndex) in Array(columnNum)'
            :key='columnIndex'
            :class='{
              prev: isPrevMonth(rowIndex, columnIndex),
              next: isNextMonth(rowIndex, columnIndex),
              active: activeIndex.rowIndex === rowIndex && activeIndex.columnIndex === columnIndex
            }'
            :style='{height: itemHeight + "px"}'
            @click='handleOnClick(rowIndex, columnIndex)'
          >
            <div class='ki-calendar-day'>
              {{computedCurrentDate(rowIndex, columnIndex)}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onBeforeMount,
  ref,
  reactive,
} from 'vue';

export type ActiveIndex = {
  rowIndex?: number;
  columnIndex?: number;
}

export default defineComponent({
  name: 'Calendar',
  props: {
    itemHeight: {
      type: Number,
      default: 88,
    },
  },
  setup() {
    const rowNum = 6;
    const columnNum = 7;
    const weeks = ['一', '二', '三', '四', '五', '六', '日'];
    const lastDay = ref(0); // 当前月的最后一天
    const currentMonthFirstDayWeek = ref(1); // 当前月的第一天是星期几
    const currentDate = reactive({
      date: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
    const activeIndex = reactive<ActiveIndex>({});

    /**
     * 获取当前月份的最后一天和当前月份第一天是星期几
     */
    const getCurrentMonthLastDayAndFirstDayWeek = (year: number, month: number) => {
      /**
       * 前面将 week 加了 1，所以这里要再减去
       */
      const week = new Date(year, month - 1, 1).getDay();
      lastDay.value = new Date(year, month, 0).getDate();
      currentMonthFirstDayWeek.value = week === 0 ? 7 : week; // 0 为周日
    };

    /**
     * 计算页面展示的日期
     * */
    const computedCurrentDate = (rowIndex: number, columnIndex: number) => {
      const date = columnIndex + 1 + (rowIndex * 7) - (currentMonthFirstDayWeek.value - 1);
      if (rowIndex === 0) {
        if (columnIndex + 1 >= currentMonthFirstDayWeek.value) {
          return date;
        }
        let last = 0; // 最后一天
        if (currentDate.month === 1) {
          // 去年
          last = new Date(currentDate.year - 1, 12, 0).getDate();
        } else {
          // 下个月
          last = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
        }
        // (currentMonthFirstDayWeek.value - 1): 减一后的值才为该填充的数量
        // (columnIndex + 1): index 从 0 开始，所以要加 1
        return last - (currentMonthFirstDayWeek.value - 1) + (columnIndex + 1);
      }
      if (date <= lastDay.value) {
        return date;
      }
      // 总的表格数量 - ( 当前月的天数 + 第一天因为星期偏移的值 ) = 下个月在表格中展示的天数
      const next = (rowNum * columnNum) - (lastDay.value + (currentMonthFirstDayWeek.value - 1));
      const diff = (next - columnNum); // 倒数第二行需要填充的数量
      const secondLast = columnNum - diff; // 倒数第二行已经填充的数量
      if (rowIndex === 4) {
        // 当前列的 index - 已经填充的数量 + 1 = 实际需要在倒数第二行需要填充的下一个月的值
        return columnIndex - secondLast + 1;
      }
      // 倒数第一行则需要加上 diff
      return columnIndex + diff + 1;
    };

    /**
     * 下一个月
     */
    const handleToggleNextMonth = () => {
      if (currentDate.month === 12) {
        currentDate.month = 1;
        currentDate.year += 1;
      } else {
        currentDate.month += 1;
      }
      getCurrentMonthLastDayAndFirstDayWeek(currentDate.year, currentDate.month);
    };

    /**
     * 上一个月
     */
    const handleTogglePrevMonth = () => {
      if (currentDate.month === 1) {
        currentDate.month = 12;
        currentDate.year -= 1;
      } else {
        currentDate.month -= 1;
      }
      getCurrentMonthLastDayAndFirstDayWeek(currentDate.year, currentDate.month);
    };

    /**
     * 是不是下一个月
     */
    const isNextMonth = (rowIndex: number, columnIndex: number) => (columnIndex + 1 + (rowIndex * 7) - (currentMonthFirstDayWeek.value - 1)) > lastDay.value;

    /**
     * 是不是上一个月
     */
    const isPrevMonth = (rowIndex: number, columnIndex: number) => rowIndex === 0 && (columnIndex + 1) < currentMonthFirstDayWeek.value;

    /**
     * 点击某一项
     * @param rowIndex
     * @param columnIndex
     */
    const handleOnClick = (rowIndex: number, columnIndex: number) => {
      activeIndex.columnIndex = columnIndex;
      activeIndex.rowIndex = rowIndex;
      if (isPrevMonth(rowIndex, columnIndex)) {
        handleTogglePrevMonth();
      } else if (isNextMonth(rowIndex, columnIndex)) {
        handleToggleNextMonth();
      }
    };

    onBeforeMount(() => {
      getCurrentMonthLastDayAndFirstDayWeek(currentDate.year, currentDate.month);
    });

    return {
      rowNum,
      columnNum,
      weeks,
      lastDay,
      currentDate,
      activeIndex,
      currentMonthFirstDayWeek,
      computedCurrentDate,
      isNextMonth,
      isPrevMonth,
      handleToggleNextMonth,
      handleTogglePrevMonth,
      handleOnClick,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
