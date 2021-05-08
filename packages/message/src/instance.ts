import Message from './message';
import { mountBody } from '@/utils';
import type { MessageCtx, MessageOption } from './message';

Message.Instance = () => {
  const instance = mountBody<MessageCtx>(Message);

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
