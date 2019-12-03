const Sequelize = require("sequelize");

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USERNAME
} = process.env;

console.log({ env: process.env });

const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: "mysql"
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  db
};
