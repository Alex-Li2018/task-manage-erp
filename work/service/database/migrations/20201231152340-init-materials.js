'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('materials', {
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
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('materials');
  },
};
