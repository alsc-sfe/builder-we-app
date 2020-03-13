/**
 * js、css压缩
 */

'use strict';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function(config){
  config.plugins = config.plugins || [];
  
  config.plugins.push(new UglifyJsPlugin());
  config.plugins.push(new OptimizeCSSAssetsPlugin());
};
