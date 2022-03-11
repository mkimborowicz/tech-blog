const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
module.exports = Posts;
