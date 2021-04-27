import Select from './src/select.vue';
import Option from './src/option.vue';
import OptionGroup from './src/option-group.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Select.install = () => {
  component(Select.name, Select);
};

Option.install = () => {
  component(Option.name, Option);
};

OptionGroup.install = () => {
  component(OptionGroup.name, OptionGroup);
};

export {
  Select,
  Option,
  OptionGroup,
};
