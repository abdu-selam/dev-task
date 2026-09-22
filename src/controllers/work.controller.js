const Team = require("../models/team.model");

const addWork = async (req, res) => {
  try {
    const { teamId } = req.params || {};
    const { title, description } = req.body || {};

    if (!title) {
      return res.status(400).json({
        error: "work title is required",
      });
    }

    if (!teamId) {
      return res.status(400).json({
        error: "Team is required",
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

    const works = await Team.addWork(teamId, title, description);

    if (!works) {
      return res.status(400).json({
        error: "Team is required",
      });
    }

    res.status(201).json({
      message: "Work has been added",
      works,
    });
  } catch (error) {
    console.log("Error on addWork controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addWork,
};
