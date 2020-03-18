'use strict';

const { isWeAppHost } = require('../../util/appType');
const resolveHostEntries = require('./host');
const resolveChildEntries = require('./child');

module.exports = function (config, startParam) {
  if (isWeAppHost) {
    resolveHostEntries(config, startParam);
  } else {
    resolveChildEntries(config, startParam);
  }
}
