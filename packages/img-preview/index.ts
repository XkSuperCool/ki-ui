import ImgPreview from './src/img-preview';
import { createApp } from 'vue';
const { component } = createApp({});

ImgPreview.install = () => {
  component(ImgPreview.name, ImgPreview);
};

export default ImgPreview;
