const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Participant = sequelize.define("Participant", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  challengeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Challenges",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Participant;
