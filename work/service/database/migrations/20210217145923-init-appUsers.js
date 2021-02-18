'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('appUsers', {
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
        type: STRING(60),
        allowNull: false,
      },
      age: INTEGER,
      sex: INTEGER, // 0 男 1 女
      signature: STRING(40), // 个性签名 40个字符
      avatar: STRING(90),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('appUsers');
  },
};
