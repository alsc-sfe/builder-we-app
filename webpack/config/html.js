'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const get = require('lodash/get');
const { ASSETS_URL, SAAS_CONFIG } = require('../util/const');
const plugins = require('../util/resolvePlugins')();

const { resolveHeads, resolveBodies } = plugins;

module.exports = function (config, argv) {
  config.plugins = config.plugins || [];

  let htmlWebpackPlugins = [];
  let pages = get(SAAS_CONFIG, 'page', {});
  let debug = get(SAAS_CONFIG, 'debug', false);
  let microAppName = get(SAAS_CONFIG, 'microAppName', '');
  let isCommonApp = get(SAAS_CONFIG, 'isCommonApp', false);

  let layout = get(SAAS_CONFIG, 'layout', false);
  if (layout === true) {
    layout = 'boh-layout/dev/1.0.0';
  }

  microAppName = microAppName ? microAppName : 'boh-layout';
  const commonAppName = isCommonApp ? microAppName : 'boh-layout';

  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    inject: false,
    template: require.resolve('./template.html'),
    filename: 'index.html',
    pages: JSON.stringify(pages),
    debug: debug,
    heads: resolveHeads,
    bodies: resolveBodies,
    assets_url: ASSETS_URL,
    microAppName,
    commonAppName,
    layout,
    env: process.env.NODE_ENV || 'production',
  }));

  config.plugins = config.plugins.concat(htmlWebpackPlugins);
}