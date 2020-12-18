'use strict';
const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, msg) {
    this.ctx.body = {
      code: 200,
      data,
      msg,
    };
  }

  error(data, msg) {
    this.ctx.body = {
      code: 400,
      data,
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}


module.exports = BaseController;
