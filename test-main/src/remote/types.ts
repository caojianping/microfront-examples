/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-15 10:49:39
 */

import { RouteRecordRaw } from 'vue-router';

/**
 * 远程配置接口
 */
export interface IRemoteConfig {
  /**
   * 作用域
   */
  scope: string;

  /**
   * 模块
   */
  module: string;

  /**
   * 链接地址
   */
  url: string;
}

/**
 * 远程注册接口
 */
export interface IRemoteRegister {
  /**
   * 安装模块
   */
  install: any;

  /**
   * 路由集合
   */
  routes: RouteRecordRaw[];

  /**
   * 组件集合
   */
  components: IRemoteComponent[];
}

/**
 * 远程组件接口
 */
export interface IRemoteComponent {
  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件模块
   */
  component: any;
}
