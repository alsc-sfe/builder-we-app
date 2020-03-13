const get = require('lodash/get');
const { SAAS_CONFIG } = require('./const');
const appType = get(SAAS_CONFIG, 'appType', '');

export const isWeAppHost = appType === 'weAppHost';
