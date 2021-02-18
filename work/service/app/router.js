'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/pcRouter')(app);
  require('./router/appRouter')(app);
};
