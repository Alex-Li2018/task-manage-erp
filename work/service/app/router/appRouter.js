// app端的路由处理
'use strict';

module.exports = app => {
  // 设置命名空间
  const apiV1Router = app.router.namespace('/app/v1');
  const { controller } = app;
  const { application } = controller;
  // 用户注册
  apiV1Router.post('/user/register', application.user.register);
};
