import Upload from './src/index.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Upload.install = () => {
  component(Upload.name, Upload);
};

export default Upload;
