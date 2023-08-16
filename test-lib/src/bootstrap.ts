/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-03 17:35:48
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
