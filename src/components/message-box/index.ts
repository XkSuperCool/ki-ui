import MessageBox from './instance';
import type { InstanceReturnType, Options } from './instance';
import type { MessageBoxOptions, MessageBoxType, ShowMessageFun } from './message-box.vue';

let _instance: any;
function getInstance(): InstanceReturnType {
  return _instance ? _instance : _instance = MessageBox.Instance();
}

function messageBox(options: MessageBoxOptions): ReturnType<ShowMessageFun> {
  return getInstance().default(options);
}

const showMessageBox = (type: MessageBoxType) => (message: string, title: string | Options, options?: Options): ReturnType<ShowMessageFun> => {
  if (typeof title === 'string') {
    return getInstance().common(type, message, title, options ?? {});
  } else {
    return getInstance().common(type, message, '提示', title);
  }
}

messageBox.alert = (message: string, title: string | Options, options?: Options) => {
  return showMessageBox('alert')(message, title, options);
};

messageBox.confirm = (message: string, title: string | Options, options?: Options) => {
  return showMessageBox('confirm')(message, title, options);
};

export default messageBox;
