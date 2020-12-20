'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 设置命名空间
  const apiV1Router = app.router.namespace('/web/v1');
  const { controller } = app;
  const { web } = controller;

  // 用户注册
  apiV1Router.post('/user/register', web.user.register);
  // 用户列表
  apiV1Router.get('/user/lists', web.user.lists);
};
