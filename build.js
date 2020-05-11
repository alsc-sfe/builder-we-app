const webpack = require('webpack');
const webpackBuildConfig = require("./webpack/webpack.build.config");

const build = async () => {
  await webpack(webpackBuildConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error("构建过程出错！");
      if (stats.hasErrors()) {
        console.error('stats 构建出错', stats.toJson({ errorDetails: false }));
      }
      if (err) {
        console.error('err 构建出错', err.message);
      }
      // 异常退出，反馈exitCode为1
      process.exit(1);
    } else {
      console.log("构建成功！");
    }    
  });
}

(async () => {
  await build();
})();