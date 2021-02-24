import { StatusType } from '@/types/common';
import Message from './instance';
import themeOptions from './theme';
import { MessageOption } from './message';

let instance: any;

function getInstance() {
  return instance = instance ?? Message.Instance();
}

function addMessage(option: MessageOption): string {
  const _instance = getInstance();
  return _instance.add(option);
}

export type MessageObject = {
  [key in StatusType]: (option: MessageOption | string) => string
};

export type MessageClose = {
  close: (name: string) => void;
}

const message: MessageObject & MessageClose = {
  close(name: string) {
    const _instance = getInstance();
    _instance.remove(name);
  },
} as MessageObject & MessageClose;

for (const theme of Object.keys(themeOptions)) {
  message[(theme as StatusType)] = (option: MessageOption | string) => {
    let _option: MessageOption = {
      content: '',
      theme: theme as StatusType,
      delay: 3000,
      showIcon: true,
    };
    if (typeof option === 'string') {
      _option.content = option;
    }
    if (typeof option === 'object' && option !== null) {
      _option = Object.assign(_option, option, {
        theme: theme as StatusType,
      });
    }

    return addMessage(_option);
  };
}

export default message;
