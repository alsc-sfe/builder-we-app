'use strict';

const { isWeAppHost } = require('../../util/appType');
const resolveHostEntries = require('./host');
const resolveChildEntries = require('./child');

module.exports = function (config, argv) {
  if (isWeAppHost) {
    resolveHostEntries(config, argv);
  } else {
    resolveChildEntries(config, argv);
  }
}
