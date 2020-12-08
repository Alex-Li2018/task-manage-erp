'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 设置命名空间
  const apiV1Router = app.router.namespace('/web/v1');
  const { controller } = app;
  const { web } = controller;

  apiV1Router.get('/user/login', web.user.login);
};