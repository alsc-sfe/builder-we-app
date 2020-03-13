const webpack = require('webpack');
const webpackBuildConfig = require("./webpack/webpack.build.config");

const build = async () => {
  await webpack(webpackBuildConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(stats);
      console.log(err);
      console.log("构建过程出错！");
    } else {
      console.log("构建成功！");
    }    
  });
}

(async () => {
  await build();
})();