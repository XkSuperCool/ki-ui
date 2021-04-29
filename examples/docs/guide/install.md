## 安装

### npm 安装

```js
  npm install ki-ui
```

> 目前还未发布到 npm，暂时无法通过上面方式进行下载。


### 引入使用

```js
  import { createApp } from 'vue';
  import App from './App.vue';
  import KiUi from 'ki-ui';
  import 'ki-ui/lib/css/ki-ui_theme.css';

  const app = createApp(App);
  app.use(KiUi);
  app.mount('#root');
```