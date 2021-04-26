import Button from './src';
import { createApp } from 'vue';
const { component } = createApp({});

Button.install = () => {
  component(Button.name, Button);
};
export default Button;
