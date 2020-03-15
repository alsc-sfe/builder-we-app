'use strict';

const path = require('path');
const { SRC_PATH } = require('../../util/const');

const plugins = require('../../util/resolvePlugins')();
const { resolveEntry } = plugins;

module.exports = function (config, argv) {
  const entries = config.entry || {};
  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

  let fileName = 'index';
  let entryValue = [];
  //每个页面的index.jsx入口文件
  let filePath = path.join(SRC_PATH, fileName);
  // development下使用热更新
  if (process.env.NODE_ENV === 'development') {
    entryValue.push(hotMiddlewareScript, filePath);
  } else {
    entryValue.push(filePath);
  }
  entries[fileName] = resolveEntry.concat(entryValue);

  // development下使用热更新
  if (process.env.NODE_ENV !== 'development') {
    fileName = 'version-engine';
    entryValue = [];
    //每个页面的index.jsx入口文件
    filePath = path.join(SRC_PATH, fileName);
    entryValue.push(filePath);
    entries[fileName] = resolveEntry.concat(entryValue);
  }

  config.entry = entries;
}
