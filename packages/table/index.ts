import Table from './src/table.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Table.install = () => {
    component(Table.name, Table);
};

export default Table;
