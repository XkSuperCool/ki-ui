import MessageBox from './instance';
import type { InstanceReturnType, Options } from './instance';
import type { MessageBoxOptions, MessageBoxType } from './message-box.vue';

let _instance: any;
function getInstance(): InstanceReturnType {
  return _instance ? _instance : _instance = MessageBox.Instance();
}

function messageBox(options: MessageBoxOptions) {
  getInstance().default(options);
}

function showMessageBox(type: MessageBoxType, args: any[]) {
  if (typeof args[1] === 'string') {
    getInstance().common(type, args[0], args[1], args[2]);
  } else {
    getInstance().common(type, args[0], '提示', args[1]);
  }
}

function alert(message: string, options: Options): void;
function alert(message: string, title: string, options: Options): void;
function alert(...args: any[]) {
  showMessageBox('alert', args);
}
messageBox.alert = alert;

function confirm(message: string, options: Options): void;
function confirm(message: string, title: string, options: Options): void;
function confirm(...args: any[]) {
  showMessageBox('confirm', args);
}
messageBox.confirm = confirm;

export default messageBox;
