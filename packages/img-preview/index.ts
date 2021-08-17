import ImgPreview from './src/img-preview';
import $ImgPreview from './src/index';
import { createApp } from 'vue';
import type { App } from 'vue';

const { component } = createApp({});
ImgPreview.install = (app: App) => {
  component(ImgPreview.name, ImgPreview);
  app.config.globalProperties.$ImgPreview = $ImgPreview;
};

export default ImgPreview;
