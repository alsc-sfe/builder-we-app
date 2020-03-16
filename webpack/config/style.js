/**
 * css样式
 */

'use strict';

const path = require('path');
const get = require('lodash/get');
const pxtoremPlugin = require('postcss-pxtorem');
const safeAreaInsetPlugin = require('postcss-safe-area-inset')
const autoprefixer = require('autoprefixer');
const {
  SAAS_CONFIG,
  CSS_SCOPE,
  ROOT_PATH
} = require('../util/const');

// 获取sass.config.js themes配置
let themes = get(SAAS_CONFIG, 'webpack.themes', {});
// 获取sass.config.js 端配置
let sat = SAAS_CONFIG.sat || 'pc';

const getPostcssConfig = () => {
  const postcssOptions = {
    sourceMap: true,
    plugins: [
      require.resolve('postcss-import'),
      require.resolve('postcss-url'),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      })
    ],
  };
  // H5/app postcss配置：屏幕适配
  /h5/.test(sat) && postcssOptions.plugins.push(
    pxtoremPlugin({
      rootValue: 100,
      propList: ['*'],
    }),
    safeAreaInsetPlugin()
  );
  return postcssOptions;
}

module.exports = function (config, argv) {
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.plugins = config.plugins || [];

  const postcssOptions = getPostcssConfig();

  const cssOptions = {
    modules: true,
    localIdentName: `${CSS_SCOPE}_[path][local]_[hash:base64:5]`,
    context: 'src',
    sourceMap: true
  }

  const excludeReg = [path.resolve(ROOT_PATH, 'node_modules'), /saas-biz-pc/];

  const styleModuleRule = [{
      test: /\.css$/,
      exclude: path.resolve(ROOT_PATH, 'src/'),
      use: [{
        loader: require.resolve('style-loader'),
      }, {
        loader: require.resolve('css-loader'),
      }, {
        loader: require.resolve('postcss-loader'),
        options: postcssOptions,
      }],
    },
    {
      test: /\.less$/,
      exclude: excludeReg,
      use: [{
          loader: require.resolve('style-loader'),
        }, {
          loader: require.resolve('css-loader'),
          options: cssOptions
        }, {
          loader: require.resolve('postcss-loader'),
          options: postcssOptions,
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            modifyVars: themes,
            noIeCompat: true,
            javascriptEnabled: true,
          },
        }
      ]
    },
    {
      test: /\.less$/,
      include: excludeReg,
      use: [{
          loader: require.resolve('style-loader'),
        }, {
          loader: require.resolve('css-loader'),
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            modifyVars: themes,
            noIeCompat: true,
            javascriptEnabled: true,
          },
        }
      ]
    }
  ];

  config.module.rules = config.module.rules.concat(styleModuleRule);
};
