'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const get = require('lodash/get');
const { ASSETS_URL, SAAS_CONFIG, PUBLISH_ENV, DOMAIN_ENV, BUILD_APP_NAME, CDN_BASE } = require('../util/const');
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
  const hostApp = get(SAAS_CONFIG, 'hostApp', []);
  const hostAppName = get(SAAS_CONFIG, 'hostAppName', []);

  let layout = get(SAAS_CONFIG, 'layout', false);
  if (layout === true) {
    layout = 'boh-layout/daily/1.0.3';
  }

  const weAppHostJS = [];
  const weAppHostCSS = [];

  if (typeof hostApp === 'string') {
    // 获取父应用静态资源地址
  } else {
    hostApp.forEach((url) => {
      if (url.indexOf('.js') > -1) {
        weAppHostJS.push(url);
      } else if (url.indexOf('.css') > -1) {
        weAppHostCSS.push(url);
      }
    });
  }

  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    inject: appType === 'weAppHost',
    template: require.resolve('./template.ejs'),
    filename: 'index.html',

    appType,
    isWeAppHost,
    title,
    pages: JSON.stringify(pages),
    debug,
    heads: resolveHeads,
    bodies: resolveBodies,

    assetsUrl: ASSETS_URL,
    cdnBase: CDN_BASE,

    layout,
    env: DOMAIN_ENV,
    publishEnv: PUBLISH_ENV,

    hostAppName: BUILD_APP_NAME || (typeof hostApp === 'string' ? hostApp : undefined) || hostAppName,

    weAppHostJS,
    weAppHostCSS,
  }));

  if (PUBLISH_ENV === 'local' || isWeAppHost) {
    config.plugins = config.plugins.concat(htmlWebpackPlugins);
  }
}
