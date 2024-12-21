"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Challenges", "participants_limit", {
      type: Sequelize.INTEGER, // Используйте INTEGER для ограничения участников
      allowNull: true, // Установите в false, если это обязательное поле
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Challenges", "participants_limit");
  },
};
