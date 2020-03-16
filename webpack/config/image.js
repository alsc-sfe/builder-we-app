/**
 * 图片loader配置
 * @param {json} config - webpack配置文件
 */

'use strict';

module.exports = function (config) {
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];

  let imageModuleRule = [{
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?limit=500000&minetype=image/svg+xml',
  }, {
    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff)(\?.*)?$/i,
    loader: 'url-loader?limit=500000',
  }];

  config.module.rules = config.module.rules.concat(imageModuleRule);
};
