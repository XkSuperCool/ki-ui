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
    ...routes,
  ],
});

export default router;
