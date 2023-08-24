<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />

    <h1>{{ BaseCodes.id }}|{{ BaseCodes.name }}</h1>
    <h1>{{ SystemCodes.id }}|{{ SystemCodes.name }}</h1>
    <hr />

    <BaseOne></BaseOne>
    <!-- <BaseTwo></BaseTwo> -->
    <hr />

    <SystemOne></SystemOne>
    <!-- <SystemTwo></SystemTwo> -->
    <hr />

    <HelloWorld msg="I'm Hello World component." />
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
// import HelloWorld from "@/components/HelloWorld.vue";

// 方式一：静态方式导入，结合vue.config.js中mf配置。
// const BaseOne = defineAsyncComponent(() => import("base/BaseOne.vue"));
// const BaseTwo = defineAsyncComponent(() => import("base/BaseTwo.vue"));
// const SystemOne = defineAsyncComponent(() => import("system/SystemOne.vue"));
// const SystemTwo = defineAsyncComponent(() => import("system/SystemTwo.vue"));

// 方式二：异步组件动态导入方式。
// import { registerRemoteModule } from "@/remote";
// const BaseOne = defineAsyncComponent(() =>
//   registerRemoteModule({
//     url: "http://localhost:9999/remoteEntry.js",
//     scope: "base",
//     module: "./BaseOne.vue",
//   })
// );

export default defineComponent({
  name: 'HomeView',
  components: {
    // HelloWorld,
    // BaseOne,
    // BaseTwo,
    // SystemOne,
    // SystemTwo,
  },
});
</script>

<style scoped>
.home {
  background-color: burlywood;
}
</style>
