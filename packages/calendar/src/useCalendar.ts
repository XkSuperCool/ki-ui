import { reactive } from 'vue'

export interface CalendarDateItem {
  year?: number
  month?: number
  day?: number
  next?: boolean
  prev?: boolean
  current?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useCalendar() {
  const ROW_NUM = 6
  const COLUMN_NUM = 7
  const WEEKS = ['一', '二', '三', '四', '五', '六', '日']
  const currentDate = reactive({
    year: 0,
    month: 0,
    day: 0,
    days: 0, // 当前月天数
    firstDayWeek: 1 // 第一天是星期几
  })
  const calendar = reactive<Array<CalendarDateItem>[]>([])
  const calendarActiveItem = reactive<CalendarDateItem>({})

  /**
   * 获取当前月份的最后一天和当前月份第一天是星期几
   */
  const getCurrentMonthLastDayAndFirstDayWeek = (
    year: number,
    month: number
  ) => {
    /**
     * 前面将 week 加了 1，所以这里要再减去
     */
    const week = new Date(year, month - 1, 1).getDay()
    currentDate.days = new Date(year, month, 0).getDate()
    currentDate.firstDayWeek = week === 0 ? 7 : week // 0 为周日
  }

  /**
   * 生成日历每一项
   * */
  const generateCalendarItem = (
    rowIndex: number,
    columnIndex: number
  ): CalendarDateItem => {
    const date = columnIndex + 1 + rowIndex * 7 - (currentDate.firstDayWeek - 1)
    const item: CalendarDateItem = {
      year: currentDate.year,
      month: currentDate.month,
      day: date
    }
    if (rowIndex === 0) {
      if (columnIndex + 1 >= currentDate.firstDayWeek) {
        item.current = true
        return item
      }
      let last: number // 上个月最后一天
      if (currentDate.month === 1) {
        // 去年
        last = new Date(currentDate.year - 1, 12, 0).getDate()
      } else {
        // 下个月
        last = new Date(currentDate.year, currentDate.month - 1, 0).getDate()
      }
      // (currentDate.firstDayWeek - 1): 减一后的值才为该填充的数量
      // (columnIndex + 1): index 从 0 开始，所以要加 1
      item.prev = true
      item.month = item.month === 1 ? 12 : (item.month as number) - 1
      item.day = last - (currentDate.firstDayWeek - 1) + (columnIndex + 1)
      return item
    }
    if (date <= currentDate.days) {
      item.current = true
      return item
    }
    item.month = item.month === 12 ? 1 : ((item.month as number) += 1)
    item.next = true
    // 总的表格数量 - ( 当前月的天数 + 第一天因为星期偏移的值 ) = 下个月在表格中展示的天数
    const next =
      ROW_NUM * COLUMN_NUM - (currentDate.days + (currentDate.firstDayWeek - 1))
    const diff = next - COLUMN_NUM // 倒数第二行需要填充的数量
    const secondLast = COLUMN_NUM - diff // 倒数第二行已经填充的数量
    if (rowIndex === 4) {
      // 当前列的 index - 已经填充的数量 + 1 = 实际需要在倒数第二行需要填充的下一个月的值
      item.day = columnIndex - secondLast + 1
      return item
    }
    // 倒数第一行则需要加上 diff
    item.day = columnIndex + diff + 1
    return item
  }

  /**
   * 生成日历
   * */
  const generateCalendar = (): CalendarDateItem => {
    let current: CalendarDateItem = {} // 当前日期的 item 储存
    getCurrentMonthLastDayAndFirstDayWeek(currentDate.year, currentDate.month)
    calendar.splice(0, calendar.length) // 清空原数组
    for (let rowIndex = 0; rowIndex < ROW_NUM; rowIndex += 1) {
      const arr: CalendarDateItem[] = []
      for (let columnIndex = 0; columnIndex < COLUMN_NUM; columnIndex += 1) {
        const item = generateCalendarItem(rowIndex, columnIndex)
        if (
          item.month === currentDate.month &&
          item.year === currentDate.year &&
          item.day === currentDate.day
        ) {
          current = item
        }
        arr.push(item)
      }
      calendar.push(arr)
    }
    return current
  }

  /**
   * 下一个月
   */
  const toNextMonth = () => {
    if (currentDate.month === 12) {
      currentDate.month = 1
      currentDate.year += 1
    } else {
      currentDate.month += 1
    }
    generateCalendar()
  }

  /**
   * 上一个月
   */
  const toPrevMonth = () => {
    if (currentDate.month === 1) {
      currentDate.month = 12
      currentDate.year -= 1
    } else {
      currentDate.month -= 1
    }
    generateCalendar()
  }

  /**
   * 点击某一项
   * @param date
   */
  const onClickCell = (date: CalendarDateItem) => {
    if (date.prev) {
      toPrevMonth()
    } else if (date.next) {
      toNextMonth()
    }
		calendarActiveItem.year = date.year
    calendarActiveItem.day = date.day
    calendarActiveItem.month = date.month
    currentDate.day = date.day as number
  }

  /**
   * 今天
   * */
  const toCurrentDate = () => {
    const date = new Date()
    currentDate.month = date.getMonth() + 1
    currentDate.year = date.getFullYear()
    currentDate.day = date.getDate()
    const current = generateCalendar()
    onClickCell(current)
    return calendarActiveItem
  }

  function formatDate(d: Required<CalendarDateItem>) {
    const date = new Date()
    date.setFullYear(d.year)
    date.setMonth(d.month - 1)
		date.setDate(d.day)
		return date;
  }

	function isSameDay(a: CalendarDateItem, b: CalendarDateItem) {
		return a.month === b.month && a.year === b.year && a.day === b.day;
	}

  toCurrentDate()

  return {
    WEEKS,
    calendar,
    currentDate,
    calendarActiveItem,
    onClickCell,
    toNextMonth,
    toPrevMonth,
    toCurrentDate,
		formatDate,
		isSameDay
  }
}
