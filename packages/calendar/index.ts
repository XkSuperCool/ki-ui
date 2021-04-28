import Calendar from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Calendar.install = () => {
  component(Calendar.name, Calendar);
};
export default Calendar;
