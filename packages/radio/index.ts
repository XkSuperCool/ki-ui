import Radio from './src/radio.vue';
import RadioGroup from './src/radio-group.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Radio.install = () => {
  component(Radio.name, Radio);
};

RadioGroup.install = () => {
  component(RadioGroup.name, RadioGroup);
};

export {
  Radio,
  RadioGroup,
};
