import Icon from './src';
import { createApp } from 'vue';
const { component } = createApp({});

Icon.install = () => {
  component(Icon.name, Icon);
};

export default Icon;
