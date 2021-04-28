import Tree from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Tree.install = () => {
  component(Tree.name, Tree);
};

export default Tree;
