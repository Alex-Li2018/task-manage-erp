'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;

  const AppUser = app.model.define('appusers', {
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
      type: BIGINT(11),
      allowNull: false,
    },
    password: {
      type: STRING(30),
      allowNull: false,
    },
    age: INTEGER,
    sex: INTEGER, // 0 男 1 女
    signature: STRING(40), // 个性签名 40个字符
    avatar: STRING(90),
    created_at: DATE,
    updated_at: DATE,
  }, {
    // 去除createAt updateAt
    timestamps: false,
    // 使用自定义表名
    freezeTableName: true,
    // 实例对应的表名
    tableName: 'appusers',
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
    deletedAt: false,
  });

  return AppUser;
};
