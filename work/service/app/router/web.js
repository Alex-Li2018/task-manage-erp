'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config, middleware } = app;

  const { home } = controller;

  router.get('/', home.index);
}