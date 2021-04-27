import Input from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Input.install = () => {
  component(Input.name, Input);
};

export default Input;
