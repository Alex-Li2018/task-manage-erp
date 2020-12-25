'use strict';
const Controller = require('../../core/baseController');

class LoginController extends Controller {
  /* 登录接口*/
  async login() {
    const { ctx, app } = this;
    const { phone, password } = ctx.request.body;
    // 参数验证
    ctx.validate({
      phone: { type: 'string', required: true, desc: '用户名' },
      password: { type: 'string', required: true, desc: '密码' },
    });
    if (ctx.paramErrors) {
      return this.error(ctx.paramErrors, '参数校验不通过');
    }
    try {
      const { dataValues: user } = await ctx.model.WebUser.findOne({ where: { phone } });

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
      }, '注册成功');
    } catch (err) {
      this.error(err, '登录失败');
    }
  }

  /* 登出接口 */
  async logout() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page, page_size, name } = ctx.query;

    // 格式化查询条件
    const where = {};
    name && (where.user_name = {
      [Op.like]: `%${name}%`,
    });

    try {
      const res = await ctx.model.WebUser.findAndCountAll({
        order: [[ 'uid', 'DESC' ]],
        where,
        offset: (page - 1) * page_size,
        limit: Number(page_size),
      });

      // 组装查询数据
      const data = {
        lists: res.rows,
        total: res.count,
        page: Number(page),
        page_size: Number(page_size),
      };

      this.success(data, '查询成功');
    } catch (err) {
      this.error(err, '查询失败');
    }
  }
}

module.exports = LoginController;
