import { defineAsyncComponent, AsyncComponentLoader, Component } from 'vue';
import { IRemoteConfig } from './types';

/**
 * 构建远程模块配置
 * @param option 选项
 * @returns 返回远程模块配置
 */
export function buildRemoteConfig(option: string): IRemoteConfig | null {
  const { protocol, hostname, port } = window.location;
  const parts = (option || '').split(/(\/|:)/g);
  const scope = parts.length >= 1 ? parts[0] : '';
  const module = parts.length >= 3 ? parts[2] : '';
  const uport = parts.length >= 5 ? parts[4] : '';
  if (!scope) return null;

  const url = uport
    ? `${protocol}//${hostname}:${uport}/remoteEntry.js`
    : `${protocol}//${hostname}:${port}/${scope}/remoteEntry.js`;
  return { scope, module: './' + module, url };
}

/**
 * 获取组件名称
 * @param name 名称
 * @param prefix 前缀
 * @returns 返回组件名称
 */
export function getComponentName(name: string, prefix?: string): string {
  let cname = (name || '').replace(/[A-Z]/g, (item: string) => '-' + item.toLowerCase());
  cname = prefix ? prefix + cname : cname.slice(1);
  return cname;
}

/**
 * 构建异步组件
 * @param loader 组件加载器
 * @returns 返回异步组件
 */
export function buildAsyncComponent(loader: AsyncComponentLoader): Component {
  return defineAsyncComponent({
    loader,
    // 延迟时间
    delay: 100,
    // 超时时间
    timeout: 3000,
    // 是否结合Suspense组件
    suspensible: false,
    // 加载状态组件
    loadingComponent: undefined,
    // 错误状态组件
    errorComponent: undefined,
    /**
     * 错误事件
     * @param error 错误信息
     * @param retry 重试函数
     * @param fail 错误函数
     * @param attempts 重试次数
     */
    onError(error: Error, retry: () => void, fail: () => void, attempts: number) {
      const isFetch = error.message?.match(/fetch/);
      if (isFetch && attempts <= 3) retry && retry();
      else fail && fail();
    },
  });
}
