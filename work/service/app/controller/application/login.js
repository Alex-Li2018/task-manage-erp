'use strict';
const Controller = require('../../core/baseController');

class LoginController extends Controller {
  /* 登录接口*/
  async login() {
    const { ctx, app } = this;
    const { phone, password } = ctx.request.body;
    // 参数验证
    ctx.validate({
      phone: { type: 'string', required: true, desc: '手机号' },
      password: { type: 'string', required: true, desc: '密码' },
    });
    if (ctx.paramErrors) {
      return this.error(ctx.paramErrors, '参数校验不通过');
    }
    try {
      const { dataValues: user } = await ctx.model.AppUser.findOne({ where: { phone } });

      if (!user || user.password !== password) {
        this.error({}, '手机号或密码错误!');
        return;
      }

      // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
      const token = app.jwt.sign({
        user_name: user.user_name,
        uid: user.uid,
      }, app.config.jwt.secret, {
        expiresIn: '1 days',
      });

      this.success({
        ...user,
        token,
      }, '登录成功');
    } catch (err) {
      this.error(err, '登录失败');
    }
  }
}

module.exports = LoginController;
