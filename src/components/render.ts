import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'ki-render',
  props: {
    render: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return props.render(h);
    };
  },
});
