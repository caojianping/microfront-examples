import { App } from 'vue';

export default (app: App) => {
  app.config.globalProperties.BaseCodes = { id: '9999', name: 'base' };
};
