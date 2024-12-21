const User = require("./User.js");
const Challenge = require("./Challenge.js");
const Category = require("./Category.js");
const DailyTask = require("./DailyTask.js");
const Participant = require("./Participant.js");
const TaskCompletion = require("./TaskCompletion.js");

// Set associations
Challenge.belongsTo(User, { foreignKey: "created_by", as: 'Creator' });
Challenge.belongsTo(Category, { foreignKey: "categoryId" });

Challenge.hasMany(Participant, { foreignKey: "challengeId" });
Participant.belongsTo(Challenge, { foreignKey: "challengeId" });

Challenge.hasMany(DailyTask, { foreignKey: "challengeId" });
DailyTask.belongsTo(Challenge, { foreignKey: "challengeId" });

// Add User-Participant association
User.hasMany(Participant, { foreignKey: "userId" });
Participant.belongsTo(User, { foreignKey: "userId" });

Participant.hasMany(TaskCompletion, { foreignKey: "participantId" });
TaskCompletion.belongsTo(Participant, { foreignKey: "participantId" });

DailyTask.hasMany(TaskCompletion, { foreignKey: "taskId" });
TaskCompletion.belongsTo(DailyTask, { foreignKey: "taskId" });

module.exports = {
  User,
  Challenge,
  Category,
  DailyTask,
  Participant,
  TaskCompletion,
};
