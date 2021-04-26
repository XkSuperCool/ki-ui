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
          component: (): Component => import('./docs/icon.md'),
        },
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/button',
          component: (): Component => import('./docs/button.md'),
        },
      ],
    },
  ],
};

export default config;
