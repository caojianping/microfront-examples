export default {
  install: () => import("./install"),
  routes: [
    {
      path: "/system/index",
      name: "SystemIndex",
      component: () => import("@/views/SystemIndex.vue"),
    },
    {
      path: "/system/detail",
      name: "SystemDetail",
      component: () => import("@/views/SystemDetail.vue"),
    },
  ],
  components: [
    {
      name: "SystemOne",
      component: () => import("@/components/SystemOne.vue"),
    },
    {
      name: "SystemTwo",
      component: () => import("@/components/SystemTwo.vue"),
    },
  ],
};
