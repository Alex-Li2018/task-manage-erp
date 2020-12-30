'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('tasks-img', {
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
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('tasks-img');
  },
};
