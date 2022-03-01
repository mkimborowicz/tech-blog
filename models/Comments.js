const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
  {
    commentText: DataTypes.STRING, 
  },
  {
    sequelize,

  }
);
module.exports = Comments;