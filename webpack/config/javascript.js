'use strict';
const babelLoader = require('./babel');

module.exports = function (config) {

  config.module = config.module || {};
  config.module.rules = config.module.rules || [];


  let babelModuleRule = {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: [
      require.resolve('thread-loader'),
      require.resolve('cache-loader'),
      babelLoader,
    ]
  };

  config.module.rules.push(babelModuleRule);
};
