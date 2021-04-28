import Alert from './src';
import { createApp } from 'vue';
const { component } = createApp({});

Alert.install = () => {
  component(Alert.name, Alert);
};

export default Alert;
