import Message from './src/index';
import type { App } from 'vue';

export default {
  install(app: App): void {
    app.config.globalProperties.$message = Message;
  }
}
