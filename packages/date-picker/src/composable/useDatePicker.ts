import { ref, reactive } from 'vue'
import useCalendar from '../../../calendar/src/useCalendar'
import type { CalendarDateItem } from '../../../calendar/src/useCalendar'

type PickFunction<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
}

type CalendarAPI = PickFunction<ReturnType<typeof useCalendar>>

// eslint-disable-next-line
export function useDatePicker(api: CalendarAPI) {
  const { onClickCell, formatDate, toCurrentDate } = api

  const isOpen = ref(false)
  const panelPosition = reactive<{ left: number; top: number }>({
    left: 0,
    top: 0
  })

  function onFocus(event: MouseEvent) {
    isOpen.value = true

    if (event.target) {
      const { x, y, height } = (event.target as Element).getBoundingClientRect()
      panelPosition.left = x;
      panelPosition.top = y + height
    }
  }

  const selectDate = ref(new Date())
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
    panelPosition,
    toNow,
    onFocus,
    handleSelectDate
  }
}
