import Message from './message';
import useMount from '@/hooks/useMount';
import type { MessageCtx, MessageOption } from './message';

Message.Instance = () => {
  const instance = useMount<MessageCtx>(Message);

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
