"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Challenges", "reward", {
      type: Sequelize.JSON, // Используйте JSON, если вы хотите хранить объект
      allowNull: true, // Установите в false, если это обязательное поле
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Challenges", "reward");
  },
};
