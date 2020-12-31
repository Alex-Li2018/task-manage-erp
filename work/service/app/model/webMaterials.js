'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const WebMaterials = app.model.define('materials', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 任务id
    task_id: {
      type: INTEGER,
      allowNull: false,
    },
    // 图片链接
    img_url: {
      type: STRING(50),
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  }, {
    // 强制表名称等于模型名称
    freezeTableName: true,
  });

  return WebMaterials;
};
