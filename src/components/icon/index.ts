import { defineComponent, h } from 'vue';

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
      class: ['fa', `fa-${props.type}`],
    });
  },
});
