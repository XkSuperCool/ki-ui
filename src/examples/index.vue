<template>
  <div class='header'>
    <div class='content'>
      <div class='title'>
        KI-UI <span>/ Vue 3.x</span>
      </div>
    </div>
  </div>
  <div class='container'>
    <div v-if='isShowMenu' class='left-menu'>
      <ul class='menu'>
        <li
          v-for='item in components'
          :key='item.name'
          :class='{active: item.name === componentName}'
          @click='handleClick(item.name)'>
          {{item.title}}
        </li>
      </ul>
      <div class='close' @click='isShowMenu = false'>
        关闭菜单
      </div>
    </div>
    <div class='show' v-if='!isShowMenu' @click='isShowMenu = true'>显示菜单</div>
    <div class='content' ref='contentRef'>
      <component :is='componentName' :key='componentName' v-if='componentName' />
      <div v-else>
        Ki-UI 文档 ...
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';
import ButtonExample from './button.vue';
import IconExample from './icon.vue';
import RadioExample from './radio.vue';
import TagExample from './tag.vue';
import SelectExample from './select.vue';
import InputExample from './input.vue';
import FormExample from './form.vue';
import UploadExample from './upload.vue';
import MessageExample from './message.vue';
import PaginationExample from './page.vue';
import ModalExample from './modal.vue';
import AlertExample from './alert.vue';
import CarouselExample from './carousel.vue';
import CalendarExample from './calendar.vue';
import TreeExample from './tree.vue';
import CheckboxExample from './checkbox.vue';
import MessageBoxExample from './message-box.vue';

export default defineComponent({
  name: 'Examples',
  components: {
    ButtonExample,
    IconExample,
    RadioExample,
    TagExample,
    SelectExample,
    InputExample,
    FormExample,
    UploadExample,
    MessageExample,
    PaginationExample,
    ModalExample,
    AlertExample,
    CarouselExample,
    CalendarExample,
    TreeExample,
    CheckboxExample,
    MessageBoxExample,
  },
  setup() {
    const componentName = ref('');
    const contentRef = ref<null | HTMLDivElement>(null);
    const isShowMenu = ref(true);
    const components = [
      {
        name: 'IconExample',
        title: 'Icon 图标',
      },
      {
        name: 'ButtonExample',
        title: 'Button 按钮',
      },
      {
        name: 'TagExample',
        title: 'Tag 标签',
      },
      {
        name: 'RadioExample',
        title: 'Radio 单选框',
      },
      {
        name: 'CheckboxExample',
        title: 'Checkbox 多选框',
      },
      {
        name: 'SelectExample',
        title: 'Select 选择器',
      },
      {
        name: 'InputExample',
        title: 'Input 输入框',
      },
      {
        name: 'UploadExample',
        title: 'Upload 文件上传',
      },
      {
        name: 'FormExample',
        title: 'Form 表单',
      },
      {
        name: 'MessageExample',
        title: 'Message 消息提示',
      },
      {
        name: 'PaginationExample',
        title: 'Pagination 分页器',
      },
      {
        name: 'ModalExample',
        title: 'Modal 弹出框',
      },
      {
        name: 'AlertExample',
        title: 'Alert 警告',
      },
      {
        name: 'CarouselExample',
        title: 'Carousel 走马灯',
      },
      {
        name: 'CalendarExample',
        title: 'Calendar 日历',
      },
      {
        name: 'TreeExample',
        title: 'Tree 树形控件',
      },
      {
        name: 'MessageBoxExample',
        title: 'MessageBox 弹框',
      },
    ];
    const handleClick = (name: string) => {
      componentName.value = name;
      window.location.hash = `/${name}`;
      if (contentRef.value) {
        contentRef.value.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };
    onMounted(() => {
      // eslint-disable-next-line prefer-destructuring
      componentName.value = window.location.hash.split('/')[1];
    });
    return {
      contentRef,
      components,
      isShowMenu,
      componentName,
      handleClick,
    };
  },
});
</script>

<style scoped lang='less'>
  .header {
    .content {
      color: var(--primary-shallow-color);
      line-height: 80px;
      font-size: 20px;
      font-weight: bold;
      height: 80px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);

      .title {
        width: 1200px;
        margin: auto;
      }

      span {
        color: var(--color-minor);
        font-size: 11px;
        font-weight: normal;
      }
    }
  }

  .scroll {
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 15px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      border: 5px solid transparent;
      box-shadow: 8px 0 0 transparent inset;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: transparent;
    }
  }

  .container {
    width: 1200px;
    min-height: calc(100vh - 80px - 25px);
    margin: 0 auto;
    display: flex;
    position: relative;

    > .left-menu {
      width: 20%;
      height: calc(100vh - 80px - 21px);
      position: relative;
      margin-right: 20px;
    }

    .menu {
      height: 100%;
      overflow: auto;
      padding: 0;
      margin: 0;
      list-style: none;
      border-right: 1px solid var(--border-color);
      .scroll();
      padding-bottom: 40px;
      box-sizing: border-box;

      &:hover {
        &::-webkit-scrollbar-thumb {
          box-shadow: 8px 0 0 var(--border-color) inset;
        }
      }

      li {
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          color: var(--primary-color);
        }

        &.active {
          color: var(--primary-color);
        }
      }
    }

    .content {
      flex: 1;
      height: calc(100vh - 80px - 25px);
      overflow: auto;
      .scroll();

      &:hover {
        &::-webkit-scrollbar-thumb {
          box-shadow: 8px 0 0 var(--border-color) inset;
        }
      }
    }
  }

  .toggle {
    color: var(--color);
    font-size: 14px;
    position: absolute;
    bottom: 0;
    line-height: 40px !important;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }

  .close {
    .toggle();
    width: 100%;
    background: #fff;
    left: 0;
    padding: 0 10px 0 0;
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    text-align: right;
    box-sizing: border-box;
  }

  .show {
    .toggle();
    left: -80px;
  }
</style>
