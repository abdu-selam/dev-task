const Team = require("../models/team.model");

const addTask = async (req, res) => {
  try {
    const { teamId, workId } = req.params || {};
    const { title, description } = req.body || {};

    if (!teamId) {
      return res.status(400).json({
        error: "Team id is required",
      });
    }

    if (!workId) {
      return res.status(400).json({
        error: "work id is required",
      });
    }

    if (!title) {
      return res.status(400).json({
        error: "work title is required",
      });
    }

    const team = Team.getTeamById(teamId);

    if (!team) {
      return res.status(400).json({
        error: "Invalid Team Id",
      });
    }

    if (team.admin !== req.user.id) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    const work = Team.getWork(teamId, workId);

    if (!work) {
      return res.status(400).json({
        error: "work id is required",
      });
    }

    const addedTask = await Team.addTask(teamId, workId, {
      title,
      description,
    });

    if (!addedTask) {
      return res.status(400).json({
        error: "Nothing to add",
      });
    }

    res.status(200).json({
      data: addedTask,
    });
  } catch (error) {
    console.log("Error on addTask controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addTask,
};
