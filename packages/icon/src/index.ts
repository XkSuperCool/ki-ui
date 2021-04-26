import { defineComponent, h } from 'vue';
import './style.less';
import 'font-awesome/css/font-awesome.min.css';

export default defineComponent({
  name: 'ki-icon',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => h('span', {
      class: ['ki-icon', 'fa', `fa-${props.type}`],
    });
  },
});
