/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-08 17:10:09
 */

export default {
  install: () => import('./install'),
  components: [
    {
      name: 'BaseOne',
      component: () => import('@/components/BaseOne.vue'),
    },
    {
      name: 'BaseTwo',
      component: () => import('@/components/BaseTwo.vue'),
    },
  ],
};
