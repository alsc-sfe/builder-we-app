
'use strict';

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = function(config) {
  config.plugins = config.plugins || [];

  // 显示编译进度
  config.plugins.push(new ProgressBarPlugin());
}
