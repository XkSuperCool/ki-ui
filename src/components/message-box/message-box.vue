<template>
  <div class='ki-message-box' :class='{isHidden: isHidden}'>
    <div class='mask' @click='instance.closeOnClickModal && hiddenMessageBox()'></div>
    <div class='ki-message-box-wrapper'>
      <div class='ki-message-box-header'>
        <div>{{instance.title}}</div>
        <div class='close' @click='hiddenMessageBox()'>×</div>
      </div>
      <div class='ki-message-box-content'>
        <div
          class='ki-message-box-icon'
          :class='instance.confirmType'
          v-if='(instance.type === "confirm" || instance.type === "alert") && instance.confirmType'
        >
          <ki-icon :type='iconMap[instance.confirmType]' />
        </div>
        {{instance.message}}
      </div>
      <div class='ki-message-box-operation'>
        <ki-button
          size='small'
          style='margin-right: 10px;'
          @click='handle("cancel")'
          v-if='instance.showCancelButton'
        >
          {{instance.cancelButtonText}}
        </ki-button>
        <ki-button
          type='primary'
          size='small'
          @click='handle("confirm")'
          v-if='instance.showConfirmButton'
        >
          {{instance.confirmButtonText}}
        </ki-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import type { StatusType } from '@/types/common';
import Button from '../button';
import Icon from '../icon';

export type MessageBoxType = 'alert' | 'confirm';

export interface MessageBoxOptions {
  type: MessageBoxType;
  title: string;
  message: string;
  confirmType?: StatusType;
  closeOnClickModal?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  callback?: (action: 'confirm' | 'cancel') => void;
  beforeClose?: (done: () => void) => void;
}

export interface ShowMessageFun {
  (options: MessageBoxOptions): Promise<undefined>;
}

export interface MessageBoxInstance {
  handleShowMessageBox: ShowMessageFun;
}

export default defineComponent({
  components: {
    KiButton: Button,
    KiIcon: Icon,
  },
  setup() {
    const isHidden = ref(false);
    // 状态对应的 icon
    const iconMap = {
      success: 'check-circle',
      error: 'times-circle',
      warning: 'exclamation-circle',
      info: 'info-circle',
    };

    const instance = ref<Partial<MessageBoxOptions>>({});
    // 默认配置
    const defaultOptions: Omit<MessageBoxOptions, 'title' | 'message' | 'type'> = {
      closeOnClickModal: true,
      showConfirmButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
    };
    let handleResolve: (value?: PromiseLike<undefined> | undefined) => void;
    let handleReject: (reason?: unknown) => void;
    const handleShowMessageBox: ShowMessageFun = (options: MessageBoxOptions) => new Promise((resolve, reject) => {
      // 缓存 resolve、reject
      handleResolve = resolve;
      handleReject = reject;
      isHidden.value = false;
      instance.value = {
        showCancelButton: options.type !== 'alert',
        ...defaultOptions,
        ...options,
      };
    });

    const handle = (action: 'confirm' | 'cancel') => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      hiddenMessageBox();
      if (instance.value.callback) {
        instance.value.callback(action);
      }
      if (action === 'confirm') {
        handleResolve();
      } else {
        handleReject();
      }
    };

    // 隐藏 messageBox
    const hiddenMessageBox = () => {
      if (instance.value.beforeClose) {
        instance.value.beforeClose(() => {
          isHidden.value = true;
        });
      } else {
        isHidden.value = true;
      }
    };

    return {
      isHidden,
      instance,
      iconMap,
      handle,
      hiddenMessageBox,
      handleShowMessageBox,
    };
  },
});
</script>

<style lang='less'>
@import './style.less';
</style>
