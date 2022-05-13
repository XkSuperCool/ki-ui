import { createRouter, createWebHashHistory } from 'vue-router';
import config from '../config';
import type { Router } from '../config';

const routes = config.routers.reduce<Omit<Router, 'title'>[]>(
  (routes, item) => {
    return [
      ...routes,
      ...item.components.map((item) => ({
        name: item.name,
        path: item.path,
        component: item.component,
      })),
    ];
  },
  []
);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/install',
    },
    {
      path: '/virtual-tree',
      meta: {
        single: true,
        title: 'Virtual Tree',
        beta: true,
      },
      component: () => import('../docs/virtual-tree.md'),
    },
    ...routes,
  ],
});

export default router;
