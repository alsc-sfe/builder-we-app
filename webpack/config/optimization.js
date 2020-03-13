'use strict';

const path = require('path');

module.exports = function (config) {
  config.optimization = config.optimization || {};

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  };
}