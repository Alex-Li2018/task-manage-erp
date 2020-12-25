'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, FLOAT, TEXT } = Sequelize;
    await queryInterface.createTable('tasks', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // 任务名称
      name: {
        type: STRING(30),
        allowNull: false,
      },
      // 平台: 1 淘宝 2 天猫 3 京东 4 拼多多
      platform: {
        type: INTEGER,
        allowNull: false,
      },
      // 订单价
      order_prize: {
        type: FLOAT,
        allowNull: false,
      },
      // 返利
      rebate_prize: {
        type: FLOAT,
      },
      // 实际价格
      actual_prize: {
        type: FLOAT,
        allowNull: false,
      },
      // 总份数
      total_copies: {
        type: INTEGER,
        allowNull: false,
      },
      // 已申请
      apply_copies: {
        type: INTEGER,
      },
      // 剩余
      left_copies: {
        type: INTEGER,
      },
      detail: {
        type: TEXT,
      },
      // 开始时间
      start_at: DATE,
      // 结束时间
      end_at: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('tasks');
  },
};
