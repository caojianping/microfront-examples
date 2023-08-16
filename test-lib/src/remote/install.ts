/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-08 17:13:01
 */

import { App } from 'vue';

export default (app: App) => {
  app.config.globalProperties.BaseCodes = { id: 9999, name: 'base' };
};
