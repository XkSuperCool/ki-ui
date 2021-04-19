import MessageBox from './message-box.vue';
import type { MessageBoxInstance, MessageBoxType, MessageBoxOptions } from './message-box.vue';
import useMount from '@/hooks/useMount';

export type Options = Partial<Omit<MessageBoxOptions, 'title' | 'message' | 'type'>>;

export interface InstanceReturnType {
  common: (type: MessageBoxType, message: string, title: string, options: Options) => void;
  default: (options: MessageBoxOptions) => void;
}

MessageBox.Instance = (): InstanceReturnType => {
  const instance = useMount<MessageBoxInstance>(MessageBox);

  return {
    default(options) {
      instance.handleShowMessageBox(options);
    },

    common(type, message, title, options) {
      this.default({
        ...options,
        message,
        title,
        type: type,
      });
    },
  };
}

export default MessageBox;
