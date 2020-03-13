'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const get = require('lodash/get');
const { ASSETS_URL, SAAS_CONFIG, PUBLISH_ENV } = require('../util/const');
const plugins = require('../util/resolvePlugins')();
const { isWeAppHost } = require('../util/appType');

const { resolveHeads, resolveBodies } = plugins;

module.exports = function (config, argv) {
  config.plugins = config.plugins || [];

  const htmlWebpackPlugins = [];
  const appType = get(SAAS_CONFIG, 'appType', '');
  const title = get(SAAS_CONFIG, 'title', '');
  const pages = get(SAAS_CONFIG, 'page', {});
  const debug = get(SAAS_CONFIG, 'debug', false);
  const microAppName = get(SAAS_CONFIG, 'microAppName', 'boh-layout');

  let layout = get(SAAS_CONFIG, 'layout', false);
  if (layout === true) {
    layout = 'boh-layout/dev/1.0.0';
  }

  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    inject: appType === 'weAppHost',
    template: require.resolve('./template.html'),
    filename: 'index.html',

    appType,
    isWeAppHost,
    title,
    pages: JSON.stringify(pages),
    debug,
    heads: resolveHeads,
    bodies: resolveBodies,
    assets_url: ASSETS_URL,
    microAppName,
    layout,
    env: process.env.NODE_ENV ? 'local' : PUBLISH_ENV,
  }));

  config.plugins = config.plugins.concat(htmlWebpackPlugins);
}
