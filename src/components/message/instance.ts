import { createApp } from 'vue';
import Message, { MessageOption } from './message';

Message.Instance = () => {
  const container = document.createElement('div');
  const instance = createApp(Message).mount(container);
  const message = instance.$el;
  // 组件方法挂载到了 render 函数上
  const { render } = instance.$ as any;
  document.body.appendChild(message);

  return {
    add(option: MessageOption) {
      return render.add(option);
    },
    remove(name: string) {
      render.remove(name);
    },
  };
};

export default Message;
