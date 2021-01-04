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
    url: {
      type: STRING(255),
      allowNull: false,
    },
    // 是音频 视频 图片等
    type: {
      type: INTEGER,
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
