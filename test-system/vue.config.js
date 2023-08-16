/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-01 17:55:48
 */
const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },
  publicPath: "auto",
  configureWebpack: {
    // devtool: false,
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "async",
            reuseExistingChunk: true,
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "async",
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "system",
        filename: "remoteEntry.js",
        // library: { type: "var", name: "system" },
        exposes: {
          "./remotes": "./src/remote/index.ts",
          "./SystemOne.vue": "./src/components/SystemOne.vue",
          "./SystemTwo.vue": "./src/components/SystemTwo.vue",
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
    // optimization: {
    //   splitChunks: false,
    // },
  },
  devServer: {
    port: 9001,
    hot: true,
  },
  transpileDependencies: true,
});
