const Team = require("../models/team.model");

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body || {};
    if (!name) {
      return res.status(400).json({
        error: "Team name is required",
      });
    }

    const result = await Team.createTeam({ user: req.user, name, description });

    if (!result.status) {
      return res.status(400).json({
        error: result.error,
      });
    }

    res.status(201).json({
      message: "Team created",
      data: result.data,
    });
  } catch (error) {
    console.log("Error on createTeam", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createTeam,
};
