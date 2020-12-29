import {
  defineComponent, h, reactive, TransitionGroup, computed,
} from 'vue';
import { StatusType } from '@/types/common';
import Icon from '../icon';
import themeOptions from './theme';
import './style.less';

export interface MessageOption {
  content: string;
  delay?: number;
  name?: string;
  theme?: StatusType;
  showIcon?: boolean;
  iconClass?: string;
  offset?: number;
}

let index = 0;
const getUuid = (): string => `message-${index++}`;

export default defineComponent({
  name: 'Message',
  setup() {
    const messages = reactive<MessageOption[]>([]);

    // 状态对应的 icon
    const iconMap = {
      success: 'check-circle',
      error: 'times-circle',
      warning: 'exclamation-circle',
      info: 'info-circle',
    };

    const add = (option: MessageOption) => {
      const name = getUuid();
      const _option = Object.assign(option, { name });
      messages.push(_option);

      setTimeout(() => {
        remove(name);
      }, _option.delay);

      return name;
    };

    const remove = (name: string) => {
      const index = messages.findIndex((item) => item.name === name);
      if (index !== -1) {
        messages.splice(index, 1);
      }
    };

    const offset = computed(() => {
      const offsets = messages.map((item) => item.offset);
      return offsets[offsets.length - 1];
    });

    const render = () => h('div', {
      class: ['ki-message'],
      style: {
        top: offset.value ? `${offset.value}px` : '20px',
      },
    }, [
      h(TransitionGroup, { name: 'fade' }, {
        default() {
          return messages.map((item, index) => h('div', {
            class: 'ki-message-item',
            key: item.name,
            style: {
              ...themeOptions[item.theme as StatusType],
            },
          }, [
            item.showIcon ? h(Icon, { type: item.iconClass ? item.iconClass : iconMap[item.theme as StatusType] }) : null,
            item.content,
          ]));
        },
      }),
    ]);

    render.add = add;
    render.remove = remove;

    return render;
  },
});