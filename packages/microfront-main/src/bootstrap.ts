import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router';

// import { mockFetch } from './utils';
import { RemoteLoader } from './remote';

async function render() {
  const app = createApp(App);
  app.use(router);

  const loader = new RemoteLoader(app, router);

  // 第一种：异步组件注册测试
  app.component(
    'HelloWorld',
    defineAsyncComponent(() => import('@/components/HelloWorld.vue'))
  );

  // 第二种：远程异步组件注册测试
  // const remoteConfigs: any = await mockFetch([
  //   {
  //     url: 'http://localhost:9999/remoteEntry.js',
  //     scope: 'base',
  //     module: './BaseOne.vue',
  //   },
  // ]);
  // for (let i = 0; i < remoteConfigs.length; i++) {
  //   await loader.registerModule(remoteConfigs[i]);
  // }

  // 第三种：动态异步组件注册测试
  const options =
    process.env.NODE_ENV === 'production'
      ? ['base/remotes', 'system/remotes']
      : ['base/remotes:9999', 'system/remotes:9001'];
  console.log('options:', options);
  await loader.registerRemoteModules(options);
  app.mount('#app');
}

render();
