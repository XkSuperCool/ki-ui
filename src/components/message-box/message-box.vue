<template>
  <div class='ki-message-box'>
    <transition name='fade'>
      <div v-show='!isHidden' class='ki-message-box-inner'>
        <div class='mask' @click='options.closeOnClickModal && handle("cancel")' v-if='options.mask'></div>
      </div>
    </transition>
    <transition name='fall'>
      <div class='ki-message-box-wrapper' :class='{center: options.center}' v-show='!isHidden'>
        <div class='ki-message-box-header'>
          <div>{{options.title}}</div>
          <div class='close' @click='handle(options.distinguishCancelAndClose ? "close" : "cancel")'>×</div>
        </div>
        <div class='ki-message-box-content'>
          <div
            class='ki-message-box-icon'
            :class='options.iconType'
            v-if='(options.type === "confirm" || options.type === "alert") && options.iconType'
          >
            <ki-icon :type='iconMap[options.iconType]' />
          </div>
          <template v-if='!options.dangerouslyUseHTMLString'>{{options.message}}</template>
          <div v-else v-html='options.message'></div>
          <div v-if='options.type === "prompt"' class='ki-message-box-prompt'>
            <ki-input
              v-model='promptValue.value'
              @input='validateValue'
              :class='{borderColor: !promptValue.validateStatus}'
              :placeholder='options.inputPlaceholder'
              :type='options.inputType'
            />
            <p v-if='!promptValue.validateStatus'>{{options.inputErrorMessage}}</p>
          </div>
        </div>
        <div class='ki-message-box-operation'>
          <ki-button
            size='small'
            style='margin-right: 10px;'
            @click='handle("cancel")'
            v-if='options.showCancelButton'
          >
            {{options.cancelButtonText}}
          </ki-button>
          <ki-button
            type='primary'
            size='small'
            @click='handle("confirm")'
            v-if='options.showConfirmButton'
          >
            <ki-icon v-if='buttonIsLoading' type='spinner' class='ki-message-box-spinner' />
            {{options.confirmButtonText}}
          </ki-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, ref, onMounted, onBeforeUnmount,
  reactive,
} from 'vue';
import type { StatusType } from '@/types/common';
import Button from '../button';
import Icon from '../icon';
import Input from '../input/index.vue';

export type MessageBoxType = 'alert' | 'confirm' | 'prompt';

export interface MessageBoxOptions {
  type: MessageBoxType; // 展示的 MessageBox 类型
  title: string; // 标题
  message: string; // 提示信息
  center?: boolean; // 是否居中布局
  iconType?: StatusType; // icon type
  mask?: boolean; // 是否显示遮罩层
  lockScroll?: boolean; // 是否在 MessageBox 出现时将 body 滚动锁定
  inputPattern?: RegExp; // prompt 输入框的校验正则
  inputErrorMessage?: string; // 失败的提示信息
  inputPlaceholder?: string; // 输入框的 placeholder
  inputType?: string; // 输入框的类型
  inputValue?: string; // 输入框的初始值
  closeOnClickModal?: boolean; // 点击遮罩层是否可以关闭 MessageBox
  showCancelButton?: boolean; // 是否显示 cancel 按钮
  showConfirmButton?: boolean; // 是否显示 confirm 按钮
  cancelButtonText?: string; // cancel 按钮文字
  confirmButtonText?: string; // confirm 按钮文字
  closeOnHashChange?: boolean; // 是否在 hashchange 时关闭 MessageBox
  dangerouslyUseHTMLString?: boolean; // message 是否支持 HTML 片段
  distinguishCancelAndClose?: boolean; // 是否区分取消触发和关闭触发
  callback?: (action: MessageBoxAction, value: string) => void; // 点击按钮的回调
  beforeClose?: (done: () => void, action: MessageBoxAction) => void; // 关闭 MessageBox 前的回调
}

export interface ShowMessageFun {
  (options: MessageBoxOptions): Promise<string>;
}

export interface MessageBoxInstance {
  handleShowMessageBox: ShowMessageFun;
}

/**
 * 点击按钮的不同 Action
 * confirm : 确定按钮
 * cancel  : 取消按钮
 * close   : messageBox 右上角的 x ，只有在 distinguishCancelAndClose=ture; 的情况下再回出现 close，不然是 cancel
 */
export type MessageBoxAction = 'confirm' | 'cancel' | 'close';

export default defineComponent({
  components: {
    KiButton: Button,
    KiIcon: Icon,
    KiInput: Input,
  },
  setup() {
    const isHidden = ref(true);
    // 状态对应的 icon
    const iconMap = {
      success: 'check-circle',
      error: 'times-circle',
      warning: 'exclamation-circle',
      info: 'info-circle',
    };

    // prompt 的 input 值
    const promptValue = reactive({
      value: '',
      validateStatus: true,
    });
    const buttonIsLoading = ref(false); // button 是否显示加载中 loading
    const messageBoxOptions = ref<Partial<MessageBoxOptions>>({});
    // 默认配置
    const defaultOptions: Omit<MessageBoxOptions, 'title' | 'message' | 'type'> = {
      mask: true,
      inputType: 'text',
      lockScroll: true,
      closeOnClickModal: true,
      showConfirmButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      inputErrorMessage: '输入的数据不合法！',
    };
    let handleResolve: (value: string) => void;
    let handleReject: (reason?: MessageBoxAction) => void;
    const handleShowMessageBox: ShowMessageFun = (options: MessageBoxOptions) => new Promise((resolve, reject) => {
      // 重置 promptValue
      promptValue.value = options.inputValue ?? '';
      promptValue.validateStatus = true;
      buttonIsLoading.value = false;
      // 缓存 resolve、reject
      handleResolve = resolve;
      handleReject = reject;
      const isAlert = options.type !== 'alert';
      messageBoxOptions.value = {
        showCancelButton: isAlert,
        closeOnHashChange: isAlert,
        ...defaultOptions,
        ...options,
      };
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleLockScroll(true);
      // 显示 message box
      isHidden.value = false;
    });

    // 格式校验
    const validateValue = () => {
      if (messageBoxOptions.value.inputPattern) {
        const status = messageBoxOptions.value.inputPattern.test(promptValue.value);
        promptValue.validateStatus = status;
        return status;
      }
      promptValue.validateStatus = false;
      return false;
    };

    // body 滚动锁定
    const handleLockScroll = (lock: boolean) => {
      if (messageBoxOptions.value.lockScroll) {
        // body 滚动锁定
        document.body.style.overflow = lock ? 'hidden' : 'auto';
      }
    };

    // 隐藏 messageBox
    const hiddenMessageBox = () => {
      isHidden.value = true;
      handleLockScroll(false);
    };

    // 处理按钮点击
    const handle = (action: MessageBoxAction) => {
      // 阻止重复点击
      if (buttonIsLoading.value) return;
      function callback() {
        if (messageBoxOptions.value.callback) {
          messageBoxOptions.value.callback(action, promptValue.value);
        }
        if (action === 'confirm') {
          if (messageBoxOptions.value.type === 'prompt' && !validateValue()) {
            return;
          }
          handleResolve(promptValue.value);
        } else if (!messageBoxOptions.value.callback) {
          // 只有在没有传递 callback 时才调用 reject
          handleReject(action);
        }
        hiddenMessageBox();
      }
      if (messageBoxOptions.value.beforeClose) {
        if (action === 'confirm') buttonIsLoading.value = true;
        messageBoxOptions.value.beforeClose(callback, action);
      } else {
        callback();
      }
    };

    // 监听 hashchange 关闭 message box
    const handleOnHashChangeClose = () => {
      if (messageBoxOptions.value.closeOnHashChange) {
        hiddenMessageBox();
      }
    };

    onMounted(() => {
      window.addEventListener('hashchange', handleOnHashChangeClose);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('hashchange', handleOnHashChangeClose);
    });

    return {
      isHidden,
      iconMap,
      promptValue,
      options: messageBoxOptions,
      buttonIsLoading,
      handle,
      validateValue,
      hiddenMessageBox,
      handleShowMessageBox,
    };
  },
});
</script>

<style lang='less'>
@import './style.less';
</style>
