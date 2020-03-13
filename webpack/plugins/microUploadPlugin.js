const get = require('lodash/get');
const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const { SAAS_CONFIG, ROOT_PATH } = require('../util/const');
const { name: appName } = require(path.join(ROOT_PATH, 'package.json'));
const pages = get(SAAS_CONFIG, 'page', {});

nunjucks.configure('*', {
  autoescape: false,
});

class microUploadPlugin {
  constructor() {
    
  }

  apply(compiler) {
    // compiler.hooks.compilation.tap('microUploadPlugin', (compilation) => {
    //   compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('microUploadPlugin', (data, callback) => {
    //     const pages = get(SAAS_CONFIG, 'page', {});
    //     process.env.pages = JSON.stringify(pages);
    //     console.log(pages);

    //     callback(null, data);
    //   });
    // })

    // 编译前动态添加entry
    // compiler.hooks.entryOption.tap("microUploadPlugin", (context, entry) => {
    //   entry['app-config'] = path.join(__dirname, 'app-config.js');
    //   console.log(entry);
    // });

    // 编译后存储构建信息
    // compiler.plugin('emit', (compilation, callback) => {
    //   // 存储构建资源列表
    //   compilation.assets['__micro_assets.js'] = {
    //     source: function() {
    //       return process.env.pages;
    //     },
    //     size: function() {
    //       return process.env.pages.length;
    //     }
    //   };
  
    //   callback();
    // });
  }
}

module.exports = microUploadPlugin