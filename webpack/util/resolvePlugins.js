const path = require('path');
const get = require('lodash/get');
const { ROOT_PATH, SAAS_CONFIG } = require('./const');
const plugins = get(SAAS_CONFIG, 'runtime.plugins', []);
const globalHeads = get(SAAS_CONFIG, 'runtime.heads', []);
const globalBodies = get(SAAS_CONFIG, 'runtime.bodies', []);

module.exports = function() {
  let resolveHeads = [];
  let resolveBodies = [];
  let resolveEntry = [];
  plugins.map(plugin => {
    const { name = '', status = false } = plugin;
    const pluginPkg = require(path.resolve(ROOT_PATH, 'node_modules', name, 'lib/index.js'));
    const { heads = [], bodies = [], entry = '' } = pluginPkg;
    if (status) {
      resolveHeads = resolveHeads.concat(heads);
      resolveBodies = resolveBodies.concat(bodies);
      entry && resolveEntry.push(entry);
    }
  });
  const resolveData = {
    resolveHeads: globalHeads.concat(resolveHeads),
    resolveBodies: globalBodies.concat(resolveBodies),
    resolveEntry,
  };
  // console.log(resolveData);

  return resolveData;
};