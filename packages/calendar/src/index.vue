<template>
  <div>
    <slot name="header">
      <div class="ki-calendar-header">
        <div class="date">
          {{ currentDate.year }}年{{ currentDate.month }}月
        </div>
        <div class="options">
          <span @click="toPrevMonth" class="prev">上个月</span>
          <span @click="toCurrentDate">今天</span>
          <span @click="toNextMonth" class="next">下个月</span>
        </div>
      </div>
    </slot>
    <table class="ki-calendar-table" :cellspacing="0" :cellpadding="0">
      <thead>
        <th v-for="weekItem in WEEKS" :key="weekItem">
          {{ weekItem }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(itemArr, rowIndex) in calendar" :key="rowIndex">
          <td
            v-for="(date, columnIndex) in itemArr"
            :key="columnIndex"
            :class="{
              prev: date.prev,
              next: date.next,
              active:
                calendarActiveItem.day === date.day &&
                calendarActiveItem.month === date.month
            }"
            @click="onClickCell(date)"
          >
            <div class="ki-calendar-day" :style="{ height: itemHeight + 'px' }">
              <slot name="dateCell" :date="date">{{ date.day }}</slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCalendar from './useCalendar'

export default defineComponent({
  name: 'ki-calendar',
  props: {
    itemHeight: {
      type: Number,
      default: 88
    }
  },
  emits: ['on-click'],
  setup(_, { emit }) {
    const {
      WEEKS,
      calendar,
      currentDate,
      calendarActiveItem,
      onClickCell,
      toNextMonth,
      toPrevMonth,
      toCurrentDate
    } = useCalendar()

    return {
      WEEKS,
      calendar,
      currentDate,
      calendarActiveItem,
      onClickCell: (date: Parameters<typeof onClickCell>[0]) => {
        onClickCell(date)
        emit('on-click', date)
      },
      toNextMonth,
      toPrevMonth,
      toCurrentDate
    }
  }
})
</script>

<style lang="less">
@import './style.less';
</style>
