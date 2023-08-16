/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-01 17:38:09
 */
/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "base/*";
declare module "system/*";
