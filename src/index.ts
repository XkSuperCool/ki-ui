import type { App } from 'vue';
import Button from '../packages/button';
import Icon from '../packages/icon';
import Tag from '../packages/tag';
import { Form, FormItem } from '../packages/form';
import { RadioGroup, Radio } from '../packages/radio';
import '../assets/styles/global-style.css';

const components = {
  Button,
  Icon,
  Tag,
  Form,
  FormItem,
  RadioGroup,
  Radio,
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
  Tag,
  Form,
  FormItem,
  RadioGroup,
  Radio,
}
