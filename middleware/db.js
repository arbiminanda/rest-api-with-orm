const { Sequelize } = require("sequelize");
const sequelizeConfig = require("../config/database");

const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env];

const sequelize = new Sequelize(config);

module.exports = sequelize;
