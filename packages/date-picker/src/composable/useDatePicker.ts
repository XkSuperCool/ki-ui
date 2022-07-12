import { ref } from 'vue'
import useCalendar from '../../../calendar/src/useCalendar'
import type { CalendarDateItem } from '../../../calendar/src/useCalendar'

type PickFunction<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
}

type CalendarAPI = PickFunction<ReturnType<typeof useCalendar>>

// eslint-disable-next-line
export function useDatePicker(api: CalendarAPI) {
  const { onClickCell, formatDate, toCurrentDate } = api

  const selectDate = ref(new Date())

  const isOpen = ref(false)
  function onFocus() {
    isOpen.value = true
  }

  function handleSelectDate(date: CalendarDateItem) {
    onClickCell(date)
    isOpen.value = false
    selectDate.value = formatDate(date as Required<CalendarDateItem>)
  }

  function toNow() {
    handleSelectDate(toCurrentDate())
  }

  return {
    selectDate,
    isOpen,
    toNow,
    onFocus,
    handleSelectDate
  }
}
