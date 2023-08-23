import { App } from 'vue';

export default (app: App) => {
  app.config.globalProperties.BaseCodes = { id: 'bbbbb', name: 'base' };
};
