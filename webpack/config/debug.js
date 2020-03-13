
'use strict';

const webpack = require('webpack');
const get = require('lodash/get');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { SAAS_CONFIG } = require('../util/const');
// 获取sass.config.js analyze配置
const analyze = get(SAAS_CONFIG, 'webpack.analyze', false);

module.exports = function(config) {
  // set mode
  config.mode = 'development';
  config.devtool = 'source-map';

  config.plugins = config.plugins || [];
  config.devServer = config.devServer || {};

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  // 显示编译进度
  config.plugins.push(new ProgressBarPlugin());
  // chunk分析
  analyze && config.plugins.push(new BundleAnalyzerPlugin());
}
