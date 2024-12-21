"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Challenges", "visibility", {
      type: Sequelize.STRING, // Тип данных для visibility
      allowNull: true, // Установите в false, если это обязательное поле
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Challenges", "visibility");
  },
};
