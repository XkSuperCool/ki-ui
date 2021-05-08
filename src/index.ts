import type { App } from 'vue';
import Button from 'packages/button';
import Icon from 'packages/icon';
import Tag from 'packages/tag';
import Input from 'packages/input';
import Upload from 'packages/upload';
import Message from 'packages/message';
import Alert from 'packages/alert';
import Modal from 'packages/modal';
import MessageBox from 'packages/message-box';
import Calendar from 'packages/calendar';
import Tree from 'packages/tree';
import Pagination from 'packages/pagination';
import Switch from 'packages/switch';
import { Form, FormItem } from 'packages/form';
import { RadioGroup, Radio } from 'packages/radio';
import { Checkbox, CheckboxGroup } from 'packages/checkbox';
import { Select, Option, OptionGroup } from 'packages/select';
import { Carousel, CarouselItem } from 'packages/carousel';
import '../assets/styles/global-style.css';

const components = {
  Button,
  Icon,
  Tag,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  Upload,
  Alert,
  Modal,
  Carousel,
  CarouselItem,
  Calendar,
  Tree,
  Pagination,
  Switch,
};

const install = function(app: App): App {
  Object.values(components).forEach((component) => {
    app.component(component.name, component);
  });
  [Message, MessageBox].forEach((component) => {
    component.install(app);
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
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  Upload,
  Message,
  Alert,
  Modal,
  MessageBox,
  Carousel,
  CarouselItem,
  Calendar,
  Tree,
  Pagination,
  Switch,
}
