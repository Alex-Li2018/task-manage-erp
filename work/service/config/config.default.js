/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606231535920_3042';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: 'aVwCkQeOrT',
  };
  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // sequelize数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'task-manage-erp-dev-web',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '5520830',
    timezone: '+08:00', // 东八时区
  };

  return {
    ...config,
    ...userConfig,
  };
};
