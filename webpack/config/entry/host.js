'use strict';

const path = require('path');
const { SRC_PATH } = require('../../util/const');

const plugins = require('../../util/resolvePlugins')();
const { resolveEntry } = plugins;

module.exports = function (config, argv) {
  let entries = config.entry || {};
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const entryValue = [];
  //每个页面的index.jsx入口文件
  let jsEntryFile = path.join(SRC_PATH, 'index');
  // development下使用热更新
  if (process.env.NODE_ENV === 'development') {
    entryValue.push(hotMiddlewareScript, commonEntryFile, jsEntryFile);
  } else {
    entryValue.push(commonEntryFile, jsEntryFile);
  }
  entries.index = resolveEntry.concat(entryValue);

  config.entry = entries;
}
