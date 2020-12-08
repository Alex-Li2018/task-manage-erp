const { Controller } = require('egg');

class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    }

    success(data) {
        this.ctx.body = {
            code: 200,
            data,
        };
    }

    error(data) {
        this.ctx.body = {
            code: 400,
            data
        }
    }

    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}


module.exports = BaseController;