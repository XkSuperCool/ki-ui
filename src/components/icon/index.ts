import { defineComponent, h } from 'vue';
import './style.less';

export default defineComponent({
  name: 'Icon',
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
