"use strict";

const chalk = require("chalk");
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackDevHotMiddleware = require("webpack-hot-middleware");
const webpackDevConfig = require("./webpack/webpack.dev.config");

// 利用闭包特性，在不同流程中传递实例
let webpackMiddleware;
let webpackHotMiddleware;
let compiler;

module.exports = function (app, opts) {
  let webpackConfig = webpackDevConfig;

  let param = {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    quiet: false,
    stats: {
      chunks: false,
      colors: true
    }
  };
  let paramHot = {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 2000
  }

  // 生成webpack配置文件
  compiler = webpack(webpackConfig);

  webpackHotMiddleware = webpackDevHotMiddleware(compiler, paramHot);
  webpackMiddleware = webpackDevMiddleware(compiler, param);

  app.use(webpackMiddleware);
  app.use(webpackHotMiddleware);
};