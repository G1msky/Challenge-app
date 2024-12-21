"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Challenges", "difficulty", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["Easy", "Medium", "Hard"]],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Challenges", "difficulty");
  },
};
