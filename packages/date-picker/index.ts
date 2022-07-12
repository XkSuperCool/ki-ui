import DatePicker from './src'
import { createApp } from 'vue'
const { component } = createApp({})

DatePicker.install = () => {
  component(DatePicker.name, DatePicker)
}
export default DatePicker
