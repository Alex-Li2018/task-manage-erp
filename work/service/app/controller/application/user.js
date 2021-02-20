'use strict';
const Controller = require('../../core/baseController');

class UserController extends Controller {
  /* 注册接口*/
  async register() {
    const { ctx, app } = this;
    const { user_name: userName, phone, password } = ctx.request.body;

    try {
      const { dataValues } = await ctx.model.AppUser.create({ user_name: userName, phone, password });

      // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
      const token = app.jwt.sign({
        user_name: dataValues.user_name,
        uid: dataValues.uid,
      }, app.config.jwt.secret, {
        expiresIn: '1 days',
      });

      this.success({
        user_name: userName,
        phone,
        token,
      }, '注册成功');
    } catch (err) {
      console.log(err);
      if (err.original.code === 'ER_DUP_ENTRY') {
        this.error({}, '手机号重复');
      } else {
        this.error(err, '注册失败');
      }
    }
  }

  /* 用户列表接口 */
  async lists() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page, page_size, name } = ctx.query;

    // 格式化查询条件
    const where = {};
    name && (where.user_name = {
      [Op.like]: `%${name}%`,
    });

    try {
      const res = await ctx.model.AppUser.findAndCountAll({
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

  /* 用户更新信息 */
  async update() {
    const { ctx } = this;
    const {
      user_name,
      age,
      sex,
      signature,
      avatar,
    } = ctx.request.body;
    const id = ctx.params.id;

    try {
      const data = await ctx.model.AppUser.findByPk(Number(id));
      console.log(data);
      const { dataValues } = data;
      const obj = {
        user_name: user_name || dataValues.user_name,
        age: age || dataValues.age,
        sex: sex || dataValues.sex,
        signature: signature || dataValues.signature,
        avatar: avatar || dataValues.avatar,
      };
      const { dataValues: user } = await data.update(obj);

      this.success({
        ...user,
      }, '更新成功');
    } catch (err) {
      this.error(err, '更新失败');
    }
  }
}

module.exports = UserController;
