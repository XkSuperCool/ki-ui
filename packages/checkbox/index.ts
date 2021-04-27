import Checkbox from './src/checkbox.vue';
import CheckboxGroup from './src/checkbox-group.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Checkbox.install = () => {
  component(Checkbox.name, Checkbox);
};

CheckboxGroup.install = () => {
  component(CheckboxGroup.name, CheckboxGroup);
};

export {
  Checkbox,
  CheckboxGroup,
};
