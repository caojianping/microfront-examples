/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-03 17:31:30
 */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
