const { db } = require("../helpers");
const { sequelize, Sequelize: DataTypes } = db;

const Pet = sequelize.define("Pet", {
  name: DataTypes.STRING,
  owner: DataTypes.TEXT,
  species: DataTypes.TEXT,
  sex: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [1]
    }
  },
  birth: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
  death: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
});

module.exports = Pet;
