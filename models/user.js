"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../middleware/db");

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init(
  {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_photo: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
