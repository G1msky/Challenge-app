const express = require("express");
const {
  Challenge,
  DailyTask,
  Category,
  User,
  Participant,
  TaskCompletion,
} = require("../models");

const router = express.Router();
const sequelize = require("../db");
const crypto = require("crypto");

router.get("/public", async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      where: { visibility: "Public" },
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: DailyTask,
          include: [
            {
              model: TaskCompletion,
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    const challengesResult = await Promise.all(
      challenges.map(async (challenge) => {
        const participants = await Participant.findAll({
          where: { challengeId: challenge.id },
          include: [{ model: User, attributes: ["id", "username"] }],
        });
        const categories = await Category.findAll({
          where: { id: challenge.categoryId },
        });

        const categoryName = categories.map((category) => category.name)[0];
        return {
          ...challenge.toJSON(),
          participants,
          category_name: categoryName,
        };
      })
    );

    res.json(challengesResult);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// joined challenges
router.get("/joined-challenges/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const joinedChallenges = await Challenge.findAll({
      include: [
        {
          model: Participant,
          required: true,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: DailyTask,
          include: [
            {
              model: TaskCompletion,
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
      where: {
        "$Participants.userId$": userId,
      },
    });

    const challengeWithParticipants = await Promise.all(
      joinedChallenges.map(async (challenge) => {
        const participants = await Participant.findAll({
          where: { challengeId: challenge.id },
          include: [{ model: User, attributes: ["id", "username"] }],
        });
        return { ...challenge.toJSON(), participants };
      })
    );

    res.json(challengeWithParticipants);
  } catch (error) {
    console.error("Error fetching joined challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// created by user
router.get("/created-by-user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const createdChallenges = await Challenge.findAll({
      where: { created_by: userId },
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: DailyTask,
          include: [
            {
              model: TaskCompletion,
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    const challengesWithParticipants = await Promise.all(
      createdChallenges.map(async (challenge) => {
        const participants = await Participant.findAll({
          where: { challengeId: challenge.id },
          include: [{ model: User, attributes: ["id", "username"] }],
        });
        return { ...challenge.toJSON(), participants };
      })
    );

    res.json(challengesWithParticipants);
  } catch (error) {
    console.error("Error fetching created challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// challenges by id
router.get("/:id", async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);

    const challenge = await Challenge.findOne({
      where: { id: challengeId },
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: DailyTask,
          include: [
            {
              model: TaskCompletion,
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const challengesWithParticipants = await Promise.all(
      [challenge].map(async (challenge) => {
        const participants = await Participant.findAll({
          where: { challengeId: challenge.id },
          include: [{ model: User, attributes: ["id", "username"] }],
        });
        return { ...challenge.toJSON(), participants };
      })
    );

    res.json(challengesWithParticipants[0]);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/private", async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      where: { visibility: "Private" },
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: DailyTask,
          include: [
            {
              model: TaskCompletion,
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create challenge
router.post("/create", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // Check if user exists
    const userId = req.body.created_by;
    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res.status(404).json({
        error: "User not found. Cannot create challenge without valid user",
      });
    }

    // Check if category exists
    let category = await Category.findOne({
      where: { name: req.body.category },
    });

    if (!category) {
      category = await Category.create(
        { name: req.body.category },
        { transaction }
      );
    }

    const challengeData = {
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      reward: req.body.reward,
      visibility: req.body.visibility,
      participants_limit: req.body.participants_limit,
      rules: req.body.rules,
      duration: req.body.duration,
      created_by: userId,
      categoryId: category.id,
      invitation_key: crypto.randomBytes(16).toString("hex"),
    };

    const challenge = await Challenge.create(challengeData, { transaction });

    // Create daily tasks
    const tasks = req.body.daily_tasks.map((task) => ({
      title: task.task_name,
      description: task.description,
      completed: false,
      challengeId: challenge.id,
    }));

    await DailyTask.bulkCreate(tasks, { transaction });

    const response = {
      ...challenge.toJSON(),
      invitation_link: `/challenges/join/${challenge.id}/${challenge.invitation_key}`,
    };

    await transaction.commit();
    res.status(201).json(response);
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating challenge and tasks:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// join challenge
router.post("/join/:challengeId/:invitationKey?", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { challengeId, invitationKey } = req.params;
    const userId = +req.body.userId;

    const challenge = await Challenge.findByPk(challengeId);

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    // Check if user is already participating
    const existingParticipant = await Participant.findOne({
      where: {
        challengeId: challenge.id,
        userId: userId,
      },
    });

    if (existingParticipant) {
      return res.status(400).json({
        error: "You are already participating in this challenge",
      });
    }

    // Access logic:
    // Private challenges - require valid invitation key
    // Public challenges - can join directly or with invitation key
    if (challenge.visibility === "Private") {
      if (!invitationKey || challenge.invitation_key !== invitationKey) {
        return res.status(403).json({
          error: "Valid invitation key is required for private challenges",
        });
      }
    }

    // For public challenges, verify key only if provided
    if (challenge.visibility === "Public" && invitationKey) {
      if (challenge.invitation_key !== invitationKey) {
        return res.status(403).json({
          error: "Invalid invitation key",
        });
      }
    }

    // Check participants limit
    const participantsCount = await Participant.count({
      where: { challengeId: challenge.id },
    });

    if (
      challenge.participants_limit &&
      participantsCount >= challenge.participants_limit
    ) {
      return res.status(400).json({
        error: "Challenge has reached its participants limit",
      });
    }

    // Create participant
    const participantData = {
      challengeId: challenge.id,
      userId: userId,
      start_date: new Date().toISOString(),
      end_date: new Date(
        new Date().setDate(new Date().getDate() + challenge.duration)
      ).toISOString(),
    };

    const participant = await Participant.create(participantData, {
      transaction,
    });

    // Get challenge tasks
    const tasks = await DailyTask.findAll({
      where: { challengeId: challenge.id },
    });

    // Create task completion records
    const taskCompletions = [];
    const startDate = participant.start_date;
    const endDate = participant.end_date;

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      for (const task of tasks) {
        taskCompletions.push({
          date: new Date(date),
          completed: false,
          participantId: participant.id,
          taskId: task.id,
        });
      }
    }

    await TaskCompletion.bulkCreate(taskCompletions, { transaction });

    await transaction.commit();
    res.status(201).json(participant);
  } catch (error) {
    await transaction.rollback();
    console.error("Error joining challenge:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
