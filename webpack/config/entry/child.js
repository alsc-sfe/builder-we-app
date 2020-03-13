'use strict';

const path = require('path');
const fs = require('fs');
const get = require('lodash/get');
const nunjucks = require('nunjucks');
const { ROOT_PATH, SAAS_CONFIG, SRC_PATH, PUBLISH_ENV } = require('../../util/const');

const microAppName = get(SAAS_CONFIG, 'microAppName', '');
const basename = get(SAAS_CONFIG, 'basename', '');

const plugins = require('../../util/resolvePlugins')();
const { resolveEntry } = plugins;

nunjucks.configure('*', {
  autoescape: false,
});

const filterPage = (pages) => {
  if (!Array.isArray(pages)) {
    return Object.keys(pages).map(item => ({
      ...pages[item],
      module: item,
    }));
  }
  return pages;
};

module.exports = function (config, argv) {
  const entries = config.entry || {};
  let pages = get(SAAS_CONFIG, 'page', {});
  pages = filterPage(pages);

  // entry 去重
  const entrys = Array.from(new Set(pages.map(item => item.module)));
  entrys.forEach(chunkName => {
    const entryValue = [];
    const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

    //每个页面的index.jsx入口文件
    const jsEntryFile = path.join(SRC_PATH, chunkName, 'index');
    // development下使用热更新
    if (process.env.NODE_ENV === 'development') {
      entryValue.push(hotMiddlewareScript, jsEntryFile);
    } else {
      entryValue.push(jsEntryFile);
    }
    entries[chunkName] = resolveEntry.concat(entryValue);
  })

  const pagesNew = [];
  let num = 1;
  const version = PUBLISH_ENV === 'daily' ? (+ new Date()) : '';
  pages.forEach(item => {
    item.moduleReal = item.module;
    if (pagesNew.findIndex(itemInner => itemInner.module === item.module) > -1) {
      const page = {
        ...item,
        module: `${item.module}-${num}`,
      };
      page.moduleName = page.module;

      if (version) {
        page.url = [PUBLIC_PATH + item.moduleReal + '.js?t=' + version];
      } else {
        page.url = [PUBLIC_PATH + item.moduleReal + '.js'];
      }

      pagesNew.push(page);
      num++;
    } else {
      pagesNew.push(item);
    }
  });

  fs.writeFileSync(
    path.join(ROOT_PATH, '.micro_app_config.js'),
    nunjucks.renderString(fs.readFileSync(path.join(__dirname, '../dynamic/micro_app_config.nunjucks')).toString(), {
      appName: microAppName,
      basename,
      modules: JSON.stringify(pagesNew),
      version: PUBLISH_ENV === 'daily' ? (+ new Date()) : '',
    }),
  );

  // micro app config file
  entries['app-config'] = path.join(ROOT_PATH, '.micro_app_config.js');

  config.entry = entries;
}
