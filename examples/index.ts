import { createApp } from 'vue';
import App from './App.vue';
import DemoBlock from './components/demo-block.vue';
import router from './route/router';
import KiUi from '@/index';

import '../assets/styles/global-style.css';
import './style/global.less';

const app = createApp(App);
app.component('demo-block', DemoBlock);
app.use(router);
app.use(KiUi);
app.mount('#root');
