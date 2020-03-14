'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const get = require('lodash/get');
const { ASSETS_URL, SAAS_CONFIG, PUBLISH_ENV, DOMAIN_ENV, BUILD_APP_NAME } = require('../util/const');
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
  const weAppHostUrl = get(SAAS_CONFIG, 'weAppHostUrl', []);

  let layout = get(SAAS_CONFIG, 'layout', false);
  if (layout === true) {
    layout = 'boh-layout/dev/1.0.0';
  }

  const weAppHostJS = [];
  const weAppHostCSS = [];
  weAppHostUrl.forEach((url) => {
    if (url.indexOf('.js') > -1) {
      weAppHostJS.push(url);
    } else if (url.indexOf('.css') > -1) {
      weAppHostCSS.push(url);
    }
  });

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
    env: process.env.NODE_ENV === 'development' ? 'local' : DOMAIN_ENV,
    publishEnv: process.env.NODE_ENV === 'development' ? 'local' : PUBLISH_ENV,

    hostAppName: BUILD_APP_NAME,

    weAppHostJS,
    weAppHostCSS,
  }));

  config.plugins = config.plugins.concat(htmlWebpackPlugins);
}
