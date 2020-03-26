'use strict';

const chalk = require("chalk");
const path = require('path');
const url = require('url-join');
const parse = require('yargs-parser');
const BUILDER_ENV = require('./env');
const ROOT_PATH = process.cwd();
const SAAS_CONFIG = require(path.join(ROOT_PATH, 'app.config.ts'));
const PKG = require(path.join(ROOT_PATH, 'package.json'));
const PLATFORM = process.platform;
const BUILD_ENV = process.env.NODE_ENV;

// 当前所处开发阶段，project、daily、pre、prod
const KOS_PUBLISH_ENV = process.env.KOS_PUBLISH_ENV || (process.env.NODE_ENV === 'development' ? 'local' : undefined);
// 当前所处环境，pro、dev、tst、ttt、tst01、pre、tsm、fat
const KOS_DOMAIN_ENV = process.env.KOS_DOMAIN_ENV || (process.env.NODE_ENV === 'development' ? 'local' : undefined);

const KOS_PUBLISH_VERSION = process.env.KOS_PUBLISH_VERSION;
const BUILD_APP_NAME = process.env.BUILD_APP_NAME;


console.log('platform', PLATFORM);
console.log('ROOT_PATH ', ROOT_PATH );

// 云构建 || 本地构建
// const BUILD_ENV = BUILDER_ENV.BUILD_ENV;
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = BUILDER_ENV.BUILD_DEST ? path.join(ROOT_PATH, BUILDER_ENV.BUILD_DEST) : path.resolve(ROOT_PATH, 'build');
const BUILD_GIT_GROUP = BUILDER_ENV.BUILD_GIT_GROUP;
let argv = !!BUILDER_ENV.BUILD_ARGV_STR ? parse(BUILDER_ENV.BUILD_ARGV_STR) : {};

// 取得当前是日常还是生产环境
// 日常： --kos_publish_type=assets --kos_publish_env=daily
// 生产：
// console.log('获取构建环境：');
// console.log(BUILDER_ENV.BUILD_ARGV_STR);
// 云构建时校验是否开启线上构建
// BUILD_ENV === 'cloud' 云构建、BUILD_ENV === 'local' 本地构建
if (BUILD_ENV === 'cloud' && !KOS_PUBLISH_ENV) {
  console.log(chalk.red('未开启线上构建, 参考文档：https://yuque.antfin-inc.com/alsc-saas/vt2tmg/ehge2p#UqnpK'));
  process.exit(0);
}

// 获取发布环境（daily、prod）
// PUBLISH_ENV = argv.kos_publish_env;
const PUBLISH_ENV = KOS_PUBLISH_ENV;
const CDN_BASE_DAILY = '//cdn-dev.choicesaas.cn';
const CDN_BASE_PROD = '//cdn.choicesaas.cn';
let CDN_BASE = PUBLISH_ENV === 'prod' ? CDN_BASE_PROD : CDN_BASE_DAILY;

// 根据构建环境设置ASSETS_URL，ASSETS_URL作为静态资源的基础路径
// let ASSETS_URL = '/';
// TODO 后期这里域名要可配置
// http://cdn.choicesaas.cn/web/dist/appname/build_env/version/xxx.js
let ASSETS_URL = BUILD_ENV === 'development' ? '/' : url(CDN_BASE, 'web/dist', BUILD_APP_NAME, PUBLISH_ENV, KOS_PUBLISH_VERSION, '/');

console.log('CONST ASSETS_URL', ASSETS_URL);

// switch (BUILD_ENV) {
//   case 'cloud':
//     CDN_BASE = PUBLISH_ENV === 'daily' ? CDN_BASE_DAILY : CDN_BASE_PROD;
//     ASSETS_URL = url(CDN_BASE, BUILD_GIT_GROUP, BUILD_GIT_PROJECT, BUILD_GIT_VERSION, '/');
//     break;
//   case 'local':
//     ASSETS_URL = url(CDN_BASE, BUILD_GIT_GROUP, BUILD_GIT_PROJECT, BUILD_GIT_VERSION, '/');
//     break;
//   kosault:
//     break;
// }

// CSS MODULE NAMESPACE
let CSS_SCOPE = ROOT_PATH.split(path.sep).pop().split('-').pop();

const PATH_PARAMS = {
  ROOT_PATH,
  SRC_PATH,
  BUILD_PATH,
  CDN_BASE,
  ASSETS_URL,
  SAAS_CONFIG,
  CSS_SCOPE,
  PUBLISH_ENV,
  DOMAIN_ENV: KOS_DOMAIN_ENV,
  BUILD_APP_NAME,
};

// console.log('PROCESS_ENV');
// console.log(JSON.stringify(process.env, null, 2));

// console.log('PATH_PARAMS:');
// console.log(JSON.stringify(PATH_PARAMS, null, 2));

module.exports = PATH_PARAMS;
