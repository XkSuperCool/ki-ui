import Tag from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Tag.install = () => {
  component(Tag.name, Tag);
};

export default Tag;
