import { createApp } from 'vue';
import Message, { MessageOption } from './message';

Message.Instance = () => {
  const container = document.createElement('div');
  const instance = createApp(Message).mount(container);
  const message = instance.$el;
  document.body.appendChild(message);

  return {
    add(option: MessageOption) {
      return (instance.$ as any).add(option);
    },
    remove(name: string) {
      (instance.$ as any).remove(name);
    },
  };
};

export default Message;
