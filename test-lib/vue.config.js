/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-01 17:59:23
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
        name: "base",
        filename: "remoteEntry.js",
        // library: { type: "var", name: "base" },
        exposes: {
          "./BaseOne.vue": "./src/components/BaseOne.vue",
          "./BaseTwo.vue": "./src/components/BaseTwo.vue",
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
    port: 9999,
    hot: true,
  },
  transpileDependencies: true,
});
