import { App } from 'vue';

export default (app: App) => {
  app.config.globalProperties.SystemCodes = { id: '9001', name: 'system' };
};
