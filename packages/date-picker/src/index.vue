<script lang="ts">
import { defineComponent, Teleport } from 'vue'
import type { PropType } from 'vue'
import { Input } from '@/index'
import useCalendar from '../../calendar/src/useCalendar'
import { useDatePicker } from './composable/useDatePicker'

export default defineComponent({
  name: 'DatePicker',

  components: {
    Input,
    // eslint-disable-next-line
    Teleport: Teleport as any
  },

  props: {
    to: {
      type: [String, Boolean] as PropType<string | false>,
      default: false
    }
  },

  setup() {
    const calendar = useCalendar()

    return {
      WEEKS: calendar.WEEKS,
      calendar: calendar.calendar,
      isSameDay: calendar.isSameDay,
      calendarActiveItem: calendar.calendarActiveItem,

      ...useDatePicker(calendar),
    }
  }
})
</script>

<template>
  <div class="ki-date-picker">
    <Input :model-value="selectDate.toLocaleDateString()" readonly @focus="onFocus" />

    <Teleport v-if="isOpen" :to="to" :disabled="!to">
      <div class="ki-picker-panel">
        <div class="ki-picker-week">
          <div class="ki-week-item" v-for="week in WEEKS" :key="week">
            {{ week }}
          </div>
        </div>

        <div class="ki-picker-month">
          <template v-for="row in calendar">
            <div
              class="ki-picker-cell"
              :class="{
                prev: cell.prev,
                next: cell.next,
                active: isSameDay(calendarActiveItem, cell)
              }"
              @click="handleSelectDate(cell)"
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
            >
              {{ cell.day }}
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="less">
@import './style.less';
</style>
