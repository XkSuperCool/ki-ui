import type { Component } from 'vue';

export interface Router {
  groupName: string;
  components: {
    title: string;
    name: string;
    path: string;
    component: () => Component
  }[],
}

export interface Header {
  title: string;
  logo: string;
  github: string;
}

export interface Config {
  header: Header;
  router: Router[];
}

const config: Config = {
  header: {
    title: 'Ki-UI',
    logo: '',
    github: '',
  },
  router: [
    {
      groupName: 'Basic',
      components: [
        {
          title: 'Icon 图标',
          name: 'icon',
          path: '/icon',
          component: () => import('./docs/icon.md'),
        },
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/button',
          component: () => import('./docs/button.md'),
        },
        {
          title: 'Tag 标签',
          name: 'tag',
          path: '/tag',
          component: () => import('./docs/tag.md'),
        },
      ],
    },
    {
      groupName: 'Form',
      components: [
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/radio',
          component: () => import('./docs/radio.md'),
        },
        {
          title: 'Checkbox 多选框',
          name: 'checkbox',
          path: '/checkbox',
          component: () => import('./docs/checkbox.md'),
        },
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/input',
          component: () => import('./docs/input.md'),
        },
        {
          title: 'Select 选择器',
          name: 'select',
          path: '/select',
          component: () => import('./docs/select.md'),
        },
        {
          title: 'Upload 上传',
          name: 'upload',
          path: '/upload',
          component: () => import('./docs/upload.md'),
        },
        {
          title: 'Form 表单',
          name: 'form',
          path: '/form',
          component: () => import('./docs/form.md'),
        },
      ],
    },
    {
      groupName: 'Data',
      components: [
        {
          title: 'Pagination 分页',
          name: 'pagination',
          path: '/pagination',
          component: () => import('./docs/pagination.md'),
        },
        {
          title: 'Tree 树形控件',
          name: 'tree',
          path: '/tree',
          component: () => import('./docs/tree.md'),
        },
      ],
    },
    {
      groupName: 'Notice',
      components: [
        {
          title: 'Alert 警告',
          name: 'alert',
          path: '/alert',
          component: () => import('./docs/alert.md'),
        },
        {
          title: 'Message 消息提示',
          name: 'message',
          path: '/message',
          component: () => import('./docs/message.md'),
        },
        {
          title: 'MessageBox 弹框',
          name: 'messageBox',
          path: '/messageBox',
          component: () => import('./docs/message-box.md'),
        },
      ],
    },
    {
      groupName: 'Others',
      components: [
        {
          title: 'Modal 对话框',
          name: 'modal',
          path: '/modal',
          component: () => import('./docs/modal.md'),
        },
        {
          title: 'Carousel 走马灯',
          name: 'carousel',
          path: '/carousel',
          component: () => import('./docs/carousel.md'),
        },
        {
          title: 'Calendar 日历',
          name: 'calendar',
          path: '/calendar',
          component: () => import('./docs/calendar.md'),
        },
      ],
    },
  ],
};

export default config;
