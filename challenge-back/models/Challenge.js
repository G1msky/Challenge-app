const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User.js");
const DailyTask = require("./DailyTask.js");
const Participant = require("./Participant.js");
const Category = require("./Category.js");

const Challenge = sequelize.define(
  "Challenge",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Easy", "Medium", "Hard"]],
          msg: "Difficulty must be one of 'Easy', 'Medium', or 'Hard'",
        },
      },
    },
    reward: {
      type: DataTypes.JSON,
    },
    visibility: {
      type: DataTypes.STRING,
    },
    participants_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rules: {
      type: DataTypes.STRING,
    },
    invitation_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Challenges",
  }
);

module.exports = Challenge;
