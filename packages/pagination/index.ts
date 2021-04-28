import Pagination from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Pagination.install = () => {
  component(Pagination.name, Pagination);
};

export default Pagination;
