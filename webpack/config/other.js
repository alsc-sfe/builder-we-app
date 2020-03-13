'use strict';

const path = require('path');
const webpack = require('webpack');
const get = require('lodash/get');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const systemModulePlugin = require('@saasfe/saas-webpack-system-module');
const { ROOT_PATH, SAAS_CONFIG, ASSETS_URL } = require('../util/const');

const microAppName = get(SAAS_CONFIG, 'microAppName', '');

module.exports = function(config){
  config.plugins = config.plugins || [];

  config.plugins.push(new systemModulePlugin());
  config.plugins.push(new CleanWebpackPlugin([path.join(ROOT_PATH, 'build')]));
  config.plugins.push(new webpack.DefinePlugin({
    'MICRO_APPNAME': JSON.stringify(microAppName),
    'PUBLIC_PATH': JSON.stringify(ASSETS_URL),
  }));
};
