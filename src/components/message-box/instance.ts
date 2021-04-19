import MessageBox from './message-box.vue';
import type { MessageBoxInstance, MessageBoxType, MessageBoxOptions, ShowMessageFun } from './message-box.vue';
import useMount from '@/hooks/useMount';

export type Options = Partial<Omit<MessageBoxOptions, 'title' | 'message' | 'type'>>;

export interface InstanceReturnType {
  common: (type: MessageBoxType, message: string, title: string, options: Options) => ReturnType<ShowMessageFun>;
  default: (options: MessageBoxOptions) => ReturnType<ShowMessageFun>;
}

MessageBox.Instance = (): InstanceReturnType => {
  const instance = useMount<MessageBoxInstance>(MessageBox);

  return {
    default(options) {
      return instance.handleShowMessageBox(options);
    },

    common(type, message, title, options) {
      return new Promise((resolve, reject) => {
        this.default({
          ...options,
          message,
          title,
          type: type,
        }).then(resolve).catch(reject);
      });
    },
  };
}

export default MessageBox;
