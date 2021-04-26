import type { Component } from 'vue';

export interface Router {
  title: string;
  name: string;
  path: string;
  component: () => Component
}

export interface Header {
  title: string;
  logo: string;
  github: string;
}

export interface Config {
  header: Header;
  router: {
    groupName: string;
    components: Router[],
  }[];
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
          title: 'Form 表单',
          name: 'form',
          path: '/form',
          component: () => import('./docs/form.md'),
        },
      ],
    },
  ],
};

export default config;
