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
        <th v-for='weekItem in WEEKS' :key='weekItem'>
          {{weekItem}}
        </th>
      </thead>
      <tbody>
        <tr v-for='(itemArr, rowIndex) in calendar' :key='rowIndex'>
          <td
            v-for='(date, columnIndex) in itemArr'
            :key='columnIndex'
            :class='{
              prev: date.prev,
              next: date.next,
              active: calendarActiveItem.day === date.day && calendarActiveItem.month === date.month,
            }'
            @click='handleOnClick(date)'
          >
            <div class='ki-calendar-day' :style='{height: itemHeight + "px"}'>
              <slot name='dateCell' :date='date'>{{date.day}}</slot>
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
  reactive,
} from 'vue';

export interface CalendarDateItem {
  year?: number;
  month?: number;
  day?: number;
  next?: boolean;
  prev?: boolean;
  current?: boolean;
}

export default defineComponent({
  name: 'Calendar',
  props: {
    itemHeight: {
      type: Number,
      default: 88,
    },
  },
  emits: ['on-click'],
  setup(_, { emit }) {
    const ROW_NUM = 6;
    const COLUMN_NUM = 7;
    const WEEKS = ['一', '二', '三', '四', '五', '六', '日'];
    const currentDate = reactive({
      date: new Date(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      days: 0, // 当前月天数
      firstDayWeek: 1, // 第一天是星期几
    });
    const calendar = reactive<Array<CalendarDateItem>[]>([]);
    const calendarActiveItem = reactive<CalendarDateItem>({});

    /**
     * 获取当前月份的最后一天和当前月份第一天是星期几
     */
    const getCurrentMonthLastDayAndFirstDayWeek = (year: number, month: number) => {
      /**
       * 前面将 week 加了 1，所以这里要再减去
       */
      const week = new Date(year, month - 1, 1).getDay();
      currentDate.days = new Date(year, month, 0).getDate();
      currentDate.firstDayWeek = week === 0 ? 7 : week; // 0 为周日
    };

    /**
     * 生成日历每一项
     * */
    const generateCalendarItem = (rowIndex: number, columnIndex: number): CalendarDateItem => {
      const date = columnIndex + 1 + (rowIndex * 7) - (currentDate.firstDayWeek - 1);
      const item: CalendarDateItem = {
        year: currentDate.year,
        month: currentDate.month,
        day: date,
      };
      if (rowIndex === 0) {
        if (columnIndex + 1 >= currentDate.firstDayWeek) {
          item.current = true;
          return item;
        }
        let last: number; // 上个月最后一天
        if (currentDate.month === 1) {
          // 去年
          last = new Date(currentDate.year - 1, 12, 0).getDate();
        } else {
          // 下个月
          last = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
        }
        // (currentDate.firstDayWeek - 1): 减一后的值才为该填充的数量
        // (columnIndex + 1): index 从 0 开始，所以要加 1
        item.prev = true;
        item.month = item.month === 1 ? 12 : (item.month as number) - 1;
        item.day = last - (currentDate.firstDayWeek - 1) + (columnIndex + 1);
        return item;
      }
      if (date <= currentDate.days) {
        item.current = true;
        return item;
      }
      item.month = item.month === 12 ? 1 : (item.month as number) += 1;
      item.next = true;
      // 总的表格数量 - ( 当前月的天数 + 第一天因为星期偏移的值 ) = 下个月在表格中展示的天数
      const next = (ROW_NUM * COLUMN_NUM) - (currentDate.days + (currentDate.firstDayWeek - 1));
      const diff = (next - COLUMN_NUM); // 倒数第二行需要填充的数量
      const secondLast = COLUMN_NUM - diff; // 倒数第二行已经填充的数量
      if (rowIndex === 4) {
        // 当前列的 index - 已经填充的数量 + 1 = 实际需要在倒数第二行需要填充的下一个月的值
        item.day = columnIndex - secondLast + 1;
        return item;
      }
      // 倒数第一行则需要加上 diff
      item.day = columnIndex + diff + 1;
      return item;
    };

    /**
     * 生成日历
     * */
    const generateCalendar = () => {
      getCurrentMonthLastDayAndFirstDayWeek(currentDate.year, currentDate.month);
      calendar.splice(0, calendar.length); // 清空原数组
      for (let rowIndex = 0; rowIndex < ROW_NUM; rowIndex += 1) {
        const arr: CalendarDateItem[] = [];
        for (let columnIndex = 0; columnIndex < COLUMN_NUM; columnIndex += 1) {
          arr.push(generateCalendarItem(rowIndex, columnIndex));
        }
        calendar.push(arr);
      }
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
      generateCalendar();
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
      generateCalendar();
    };

    /**
     * 点击某一项
     * @param date
     */
    const handleOnClick = (date: CalendarDateItem) => {
      if (date.prev) {
        handleTogglePrevMonth();
      } else if (date.next) {
        handleToggleNextMonth();
      }
      calendarActiveItem.day = date.day;
      calendarActiveItem.month = date.month;
      currentDate.day = date.day as number;
      emit('on-click', new Date(currentDate.year, currentDate.month - 1, currentDate.day));
    };

    onBeforeMount(() => {
      generateCalendar();
    });

    return {
      WEEKS,
      calendar,
      currentDate,
      calendarActiveItem,
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
