'use strict';
const Controller = require('../../core/baseController');

class MaterialsController extends Controller {
  /** 创建任务图片 */
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

  /** 任务删除图片 */
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;

    try {
      const data = await ctx.model.WebMaterials.findByPk(Number(id));
      await data.destroy();
      this.success({}, '删除成功');
    } catch (err) {
      this.error(err, '删除失败');
    }
  }
}

module.exports = MaterialsController;
