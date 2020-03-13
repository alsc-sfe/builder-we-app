const get = require('lodash/get');
const { SAAS_CONFIG } = require('./const');
const CB = get(SAAS_CONFIG, 'webpack.config', '');

module.exports = function(baseConfig) {
  if (typeof CB === 'function') {
    return CB(baseConfig);
  } else {
    return baseConfig;
  }
};