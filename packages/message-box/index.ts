import MessageBox from './src';
import type { App } from 'vue';

export default {
  install(app: App): void {
    app.config.globalProperties.$messageBox = MessageBox;
  }
}
