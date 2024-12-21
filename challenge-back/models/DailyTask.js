const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const DailyTask = sequelize.define("DailyTask", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  challengeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Challenges",
      key: "id",
    },
  },
});

module.exports = DailyTask;
 