/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-01 17:38:09
 */

const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

const config = defineConfig({
  pages: {
    index: {
      entry: "./src/index.ts",
    },
  },
  configureWebpack: {
    // devtool: false,
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "main",
        filename: "remoteEntry.js",
        // exposes: {},
        // remotes: {
        //   base: "base@http://localhost:9999/remoteEntry.js",
        //   system: "system@http://localhost:9001/remoteEntry.js",
        // },
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
    optimization: {
      minimize: false,
    },
    resolve: {
      fallback: { path: false },
    },
  },
  devServer: {
    port: 9000,
    hot: true,
  },
  transpileDependencies: true,
});

module.exports = config;
