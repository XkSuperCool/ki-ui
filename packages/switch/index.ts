import Switch from './src/switch';
import { createApp } from 'vue';
const { component } = createApp({});

Switch.install = () => {
  component(Switch.name, Switch);
};

export default Switch;
