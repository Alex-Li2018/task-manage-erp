'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;

  const WebUser = app.model.define('users', {
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
    avatar: STRING(90),
    created_at: DATE,
    updated_at: DATE,
  });

  return WebUser;
};
