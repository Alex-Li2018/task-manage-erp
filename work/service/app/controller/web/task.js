'use strict';
const Controller = require('../../core/baseController');

class TaskController extends Controller {
  /* 创建接口*/
  async create() {
    const { ctx } = this;
    const {
      name, platform, order_prize,
      rebate_prize, actual_prize,
      total_copies, apply_copies,
      left_copies, detail,
      start_at, end_at,
    } = ctx.request.body;

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

  /** 列表 */
  async lists() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page, page_size, keyword } = ctx.query;

    // 格式化查询条件
    const where = {};
    keyword && (where.name = {
      [Op.like]: `%${keyword}%`,
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

  /** 详情 */
  async detail() {
    const { ctx } = this;
    const id = ctx.params.id;

    try {
      const { dataValues: task } = await ctx.model.WebTask.findByPk(Number(id));

      this.success({
        ...task,
      }, '查询详情成功');
    } catch (err) {
      this.error(err, '查询详情失败');
    }
  }

  /** 更新 */
  async update() {
    const { ctx } = this;
    const {
      name, platform, order_prize,
      rebate_prize, actual_prize,
      total_copies, apply_copies,
      left_copies, detail,
      start_at, end_at,
    } = ctx.request.body;
    const id = ctx.params.id;

    try {
      const data = await ctx.model.WebTask.findByPk(Number(id));

      const { dataValues: task } = await data.update({
        name, platform, order_prize,
        rebate_prize, actual_prize,
        total_copies, apply_copies,
        left_copies, detail,
        start_at, end_at,
      });

      this.success({
        ...task,
      }, '更新成功');
    } catch (err) {
      this.error(err, '更新失败');
    }
  }

  /** 删除 */
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;

    try {
      const data = await ctx.model.WebTask.findByPk(Number(id));
      await data.destroy();
      this.success({}, '删除成功');
    } catch (err) {
      this.error(err, '删除失败');
    }
  }
}

module.exports = TaskController;
