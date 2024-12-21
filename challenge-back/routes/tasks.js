const express = require("express");
const {
  DailyTask,
  Challenge,
  Participant,
  TaskCompletion,
} = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

// Get all daily tasks for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const date =
      new Date(req.query.date) || new Date().toISOString().split("T")[0];

    const participations = await Participant.findAll({
      where: { userId },
      include: [
        {
          model: Challenge,
          include: [{ model: DailyTask }],
        },
      ],
    });

    // Get all tasks with their completion status for the specified date
    const tasksWithStatus = await Promise.all(
      participations.map(async (participation) => {
        const tasksWithCompletion = await Promise.all(
          participation.Challenge.DailyTasks.map(async (task) => {
            const completion = await TaskCompletion.findOne({
              where: {
                participantId: participation.id,
                taskId: task.id,
                date: date,
              },
            });

            // Если не найдено завершение для задачи, возвращаем null
            if (!completion) {
              return null; // Возвращаем null вместо выброса ошибки
            }

            return {
              completionId: completion.id,
              taskId: task.id,
              challengeId: participation.Challenge.id,
              challengeTitle: participation.Challenge.title,
              taskTitle: task.title,
              taskDescription: task.description,
              completed: completion.completed,
              date: date,
            };
          })
        );

        return tasksWithCompletion;
      })
    );

    // Плоский массив задач
    const flattenedTasks = tasksWithStatus
      .flat()
      .filter((task) => task !== null); // Убираем null значения

    // Возвращаем пустой массив, если нет задач
    res.json(flattenedTasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:completionId/complete", async (req, res) => {
  try {
    const completionId = +req.params.completionId;
    const { completed } = req.body;

    const taskCompletion = await TaskCompletion.findByPk(completionId);

    if (!taskCompletion) {
      return res.status(404).json({ error: "Task completion not found" });
    }

    taskCompletion.completed = completed;
    await taskCompletion.save();

    res.json(taskCompletion);
  } catch (error) {
    console.error("Error marking task completion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
