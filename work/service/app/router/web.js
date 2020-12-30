'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 设置命名空间
  const apiV1Router = app.router.namespace('/web/v1');
  const { controller } = app;
  const { web } = controller;

  // 登录
  apiV1Router.post('/login', web.login.login);
  // 登出
  apiV1Router.get('/logout', web.login.logout);
  // 用户注册
  apiV1Router.post('/user/register', web.user.register);
  // 用户列表
  apiV1Router.get('/user', web.user.lists);
  // 任务
  apiV1Router.get('/tasks', web.task.lists);
  apiV1Router.post('/tasks', web.task.create);
  apiV1Router.put('/tasks/:id', web.task.update);
};
