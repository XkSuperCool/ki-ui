import { createApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import Message from './message';
import type { MessageCtx, MessageOption } from './message';

Message.Instance = () => {
  const container = document.createElement('div');
  const instance = createApp(Message).mount(container) as ComponentPublicInstance & MessageCtx;
  const message = instance.$el;
  document.body.appendChild(message);

  return {
    add(option: MessageOption) {
      return instance.add(option);
    },
    remove(name: string) {
      instance.remove(name);
    },
  };
};

export default Message;
