module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Pets",
      [
        {
          name: "Tag 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Fluffy",
          owner: "Mike",
          species: "Cat",
          sex: "f"
        },
        {
          name: "Tag 2",
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Pedro",
          owner: "Mike",
          species: "Dog",
          sex: "m"
        },
        {
          name: "Tag 3",
          createdAt: new Date(),
          updatedAt: new Date(),
          name: "Tommy",
          owner: "Mike",
          species: "Bird",
          sex: "m"
        }
      ],
      {}
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Pets", null, {});
  }
};
