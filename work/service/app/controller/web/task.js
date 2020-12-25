'use strict';
const Controller = require('../../core/baseController');

class TaskController extends Controller {
  /* 注册接口*/
  async create() {
    const { ctx } = this;
    const {
      name, platform, order_prize,
      rebate_prize, actual_prize,
      total_copies, apply_copies,
      left_copies, detail,
      start_at, end_at,
    } = ctx.request.body;
    console.log(ctx.request.body);
    try {
      const { dataValues: tasks } = await ctx.model.WebTask.create({
        name, platform, order_prize,
        rebate_prize, actual_prize,
        total_copies, apply_copies,
        left_copies, detail,
        start_at, end_at });

      this.success({
        ...tasks,
      }, '新增成功');
    } catch (err) {
      this.error(err, '新增失败');
    }
  }

  async lists() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page, page_size, name } = ctx.query;

    // 格式化查询条件
    const where = {};
    name && (where.name = {
      [Op.like]: `%${name}%`,
    });

    try {
      const res = await ctx.model.WebTask.findAndCountAll({
        order: [[ 'id', 'DESC' ]],
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

module.exports = TaskController;
