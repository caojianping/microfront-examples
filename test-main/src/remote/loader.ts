/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-15 13:47:16
 */

import { App } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';
import { generateTimestamp, isArray, isFunction } from './utils';
import { buildAsyncComponent, buildRemoteConfig } from './helper';
import { IRemoteConfig } from './types';

export class RemoteLoader {
  public app: App;
  public router: Router;

  constructor(app: App, router: Router) {
    this.app = app;
    this.router = router;
  }

  async _loadScript(url: string) {
    return new Promise((resolve: any, reject: any) => {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = `${url}?t=${generateTimestamp()}`;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = function (...args) {
        resolve();
      };
      script.onerror = function (...args) {
        document.head.removeChild(script);
        reject();
      };
      document.head.appendChild(script);
    });
  }

  async _loadModule(scope: string, module: string) {
    try {
      const container = (window as any)[scope];
      if (container && container.init && container.get) {
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(module);
        const Module = factory();
        console.log('loadRemote Module', Module);
        return Module;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log('loadRemote error', error);
      throw error;
    }
  }

  async registerInstall(install: any) {
    if (!isFunction(install)) return;

    const result = await install();
    if (!result) return;

    const module: any = result.default || result;
    module(this.app);
  }

  registerRoutes(pages: RouteRecordRaw[]) {
    if (!isArray(pages)) return;

    for (let i = 0; i < pages.length; i++) {
      this.router.addRoute(pages[i]);
    }
  }

  registerComponents(components: any[]) {
    if (!isArray(components)) return;

    for (let i = 0; i < components.length; i++) {
      const item = components[i];
      this.app.component(item.name, buildAsyncComponent(item.component));
    }
  }

  async registerModule(config: IRemoteConfig) {
    if (!config) throw new Error('异常的远程模块配置');

    await this._loadScript(config.url);
    const result = await this._loadModule(config.scope, config.module);
    if (!result) throw new Error('异常的远程模块');

    const module: any = result.default || result;
    if (!module) throw new Error('异常的远程模块');

    this.app.component(
      module.name,
      buildAsyncComponent(() => new Promise((resolve: any, reject: any) => resolve(module)))
    );
    return module;
  }

  async registerModules(configs: IRemoteConfig[]) {
    return Promise.allSettled(
      configs.map(async (config: IRemoteConfig) => {
        return this.registerModule(config);
      })
    );
  }

  async registerRemoteModules(options: string[]) {
    return Promise.allSettled(
      options.map(async (option: string) => {
        console.log(11111, option);
        const config: IRemoteConfig | null = buildRemoteConfig(option);
        if (!config) throw new Error('异常的远程模块配置');

        await this._loadScript(config.url);
        const result = await this._loadModule(config.scope, config.module);
        if (!result) throw new Error('异常的远程模块');

        const module: any = result.default || result;
        if (!module) throw new Error('异常的远程模块');

        await this.registerInstall(module.install);
        this.registerRoutes(module.routes);
        this.registerComponents(module.components);
        return module;
      })
    );
  }
}
