'use strict';

const BUILD_PATH = require('./util/const').BUILD_PATH;
const ASSETS_URL = require('./util/const').ASSETS_URL;

module.exports = function () {
  return {
    mode: "production",
    // mode: "development",
    entry: {},
    output: {
      path: BUILD_PATH,
      publicPath: ASSETS_URL,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    },
    module: {
      rules: [],
    },
    plugins: []
  };
};
