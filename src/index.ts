import type { App } from 'vue';
import Button from '../packages/button';
import Icon from '../packages/icon';
import '../assets/styles/global-style.css';

const components = {
  Button,
  Icon,
};

const install = function(app: App): App {
  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });
  return app;
}

export default {
  install,
};

export {
  Button,
}
