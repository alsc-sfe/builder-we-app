const webpack = require('webpack');
const webpackBuildConfig = require("./webpack/webpack.build.config");

const build = async () => {
  await webpack(webpackBuildConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('stats 构建出错',stats.toJson({errorDetails: false}));
      console.log('err 构建出错', err.toString());
      console.log("构建过程出错！");
      throw("构建过程出错！", err, stats);
    } else {
      console.log("构建成功！");
    }    
  });
}

(async () => {
  await build();
})();