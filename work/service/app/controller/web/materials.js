'use strict';
const Controller = require('../../core/baseController');

class MaterialsController extends Controller {
  async create() {
    const { ctx } = this;
    const {
      task_id: taskId, url, type,
    } = ctx.request.body;

    try {
      console.log(ctx.model, ctx.model.WebMaterials);
      const { dataValues: taskImg } = await ctx.model.WebMaterials.create({
        task_id: taskId, url, type,
      });

      this.success({
        ...taskImg,
      }, '新增任务图片成功');
    } catch (err) {
      console.log(err);
      this.error(err, '新增任务图片失败');
    }
  }
}

module.exports = MaterialsController;
