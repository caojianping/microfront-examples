import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import SystemIndex from '../views/SystemIndex.vue';
// import SystemDetail from '../views/SystemDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system/index',
    name: 'SystemIndex',
    component: SystemIndex,
  },
  {
    path: '/system/detail',
    name: 'SystemDetail',
    component: () => import('../views/SystemDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
