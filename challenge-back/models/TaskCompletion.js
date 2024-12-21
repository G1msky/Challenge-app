const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TaskCompletion = sequelize.define("TaskCompletion", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  participantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Participants",
      key: "id",
    },
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "DailyTasks",
      key: "id",
    },
  },
});

module.exports = TaskCompletion;
