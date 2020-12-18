'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('users', {
      uid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: STRING(30),
        allowNull: false,
      },
      phone: {
        type: BIGINT(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(12),
        allowNull: false,
      },
      age: INTEGER,
      avatar: STRING(90),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
