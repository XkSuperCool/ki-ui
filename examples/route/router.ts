import { createRouter, createWebHashHistory } from 'vue-router';
import config from '../config';
import type { Router } from '../config';

const routes = config.router.reduce<Omit<Router, 'title'>[]>((routes, item) => {
  return [...routes, ...item.components.map(({ name, component, path }) => ({
    name,
    path,
    component,
  }))]
}, []);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes,
  ],
});

export default router;
