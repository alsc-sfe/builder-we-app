/**
 *  @description 解决antd样式污染问题， 通过alias指定到文件
 * */

const fs = require('fs');
const path = require('path');

module.exports = function(alias) {
  const antdFolder = path.join(__dirname, '../../node_modules/antd');
  const items = fs.readdirSync(path.join(antdFolder, 'lib'));
  items.filter(item => {
    if (!item.startsWith('_') && !item.endsWith('.map') && !item.endsWith('.ts') && !item.endsWith('.js')) {
      const styleFilePath = `antd/lib/${item}/style`;
      alias[styleFilePath] = path.join(__dirname, '../mock/antd/empty.less');
    }
  });
};