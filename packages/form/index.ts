import Form from './src/form.vue';
import FormItem from './src/form-item.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Form.install = () => {
  component(Form.name, Form);
};

FormItem.install = () => {
  component(FormItem.name, FormItem);
};

export {
  Form,
  FormItem,
};
