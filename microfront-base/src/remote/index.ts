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
