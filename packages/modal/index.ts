import Modal from './src';
import { createApp } from 'vue';
const { component } = createApp({});

Modal.install = () => {
  component(Modal.name, Modal);
}

export default Modal;
