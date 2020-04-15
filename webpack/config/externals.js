'use strict';

module.exports = function(config) {
  config.externals = config.externals || {};

  config.externals['react'] = 'React';
  config.externals['react-dom'] = 'ReactDOM';
  config.externals['antd'] = 'antd';
  config.externals['@ant-design/icons/lib/dist'] = 'AntDesignIcons';
  config.externals['saas-fetch'] = 'saas-fetch';
  config.externals['saas-fetch-mtop'] = 'saas-fetch-mtop';
  config.externals['@saasfe/we-app-react'] = 'WeAppReact';
}
