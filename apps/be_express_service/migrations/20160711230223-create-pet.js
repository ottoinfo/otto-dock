module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      owner: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      species: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      sex: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      birth: { type: Sequelize.DATE },
      death: { type: Sequelize.DATE, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Pets");
  }
};
