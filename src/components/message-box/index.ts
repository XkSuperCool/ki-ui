import MessageBox from './instance';
import type { InstanceReturnType, Options } from './instance';
import type { MessageBoxOptions, MessageBoxType, ShowMessageFun } from './message-box.vue';

let _instance: any;
function getInstance(): InstanceReturnType {
  return _instance ? _instance : _instance = MessageBox.Instance();
}

function messageBox(options: MessageBoxOptions): ReturnType<ShowMessageFun> {
  return new Promise((resolve, reject) => {
    getInstance().default(options).then(resolve).catch(reject);
  });
}

function showMessageBox(type: MessageBoxType, args: any[]): ReturnType<ShowMessageFun> {
  return new Promise((resolve, reject) => {
    if (typeof args[1] === 'string') {
      getInstance().common(type, args[0], args[1], args[2]).then(resolve).catch(reject);
    } else {
      getInstance().common(type, args[0], '提示', args[1]).then(resolve).catch(reject);
    }
  });
}

function alert(message: string, options: Options): ReturnType<ShowMessageFun>;
function alert(message: string, title: string, options: Options): ReturnType<ShowMessageFun>;
function alert(...args: any[]): ReturnType<ShowMessageFun>  {
  return new Promise((resolve, reject) => {
    showMessageBox('alert', args).then(resolve).catch(reject);
  });
}
messageBox.alert = alert;

function confirm(message: string, options: Options): ReturnType<ShowMessageFun>;
function confirm(message: string, title: string, options: Options): ReturnType<ShowMessageFun>;
function confirm(...args: any[]): ReturnType<ShowMessageFun> {
  return new Promise((resolve, reject) => {
    showMessageBox('confirm', args).then(resolve).catch(reject);
  });
}
messageBox.confirm = confirm;

export default messageBox;
