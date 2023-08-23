/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-15 13:47:16
 */

import { App } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';

import { IRemoteConfig } from './types';
import { generateTimestamp, isArray, isFunction } from './utils';
import { buildAsyncComponent, buildRemoteConfig } from './helper';

/**
 * 远程加载器
 */
export class RemoteLoader {
  /**
   * Vue实例
   */
  public app: App;

  /**
   * 路由实例
   */
  public router: Router;

  constructor(app: App, router: Router) {
    this.app = app;
    this.router = router;
  }

  /**
   * 加载脚本
   * @param url 链接地址
   * @returns 返回脚本
   */
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

  /**
   * 加载模块
   * @param scope 作用域
   * @param module 模块
   * @returns 返回模块
   */
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

  /**
   * 注册安装
   * @param install 安装函数
   * @returns void
   */
  async registerInstall(install: any) {
    if (!isFunction(install)) return;

    const result = await install();
    if (!result) return;

    const module: any = result.default || result;
    module(this.app);
  }

  /**
   * 注册路由
   * @param routes 路由集合
   * @returns void
   */
  registerRoutes(routes: RouteRecordRaw[]) {
    if (!isArray(routes)) return;

    for (let i = 0; i < routes.length; i++) {
      this.router.addRoute(routes[i]);
    }
  }

  /**
   * 注册组件
   * @param components 组件集合
   * @returns void
   */
  registerComponents(components: any[]) {
    if (!isArray(components)) return;

    for (let i = 0; i < components.length; i++) {
      const item = components[i];
      this.app.component(item.name, buildAsyncComponent(item.component));
    }
  }

  /**
   * 注册模块
   * @param config 配置
   * @returns 返回已注册模块
   */
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

  /**
   * 注册模块集合
   * @param configs 配置集合
   * @returns 返回已注册模块集合
   */
  async registerModules(configs: IRemoteConfig[]) {
    return Promise.allSettled(
      configs.map(async (config: IRemoteConfig) => {
        return this.registerModule(config);
      })
    );
  }

  /**
   * 注册远程模块集合
   * @param options 选项集合
   * @returns 返回已注册远程模块集合
   */
  async registerRemoteModules(options: string[]) {
    return Promise.allSettled(
      options.map(async (option: string) => {
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
