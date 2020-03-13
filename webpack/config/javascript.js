'use strict';
const babelLoader = require('./babel');


module.exports = function (config) {

  config.module = config.module || {};
  config.module.rules = config.module.rules || [];


  let babelModuleRule = {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: [
      babelLoader
    ]
  };

  config.module.rules.push(babelModuleRule);
};
