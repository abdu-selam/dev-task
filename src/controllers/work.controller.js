const Team = require("../models/team.model");
const { prepareWorksRes } = require("../services/team.service");

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
        error: "Team id is required",
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
        error: "Team id is required",
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

const removeWork = async (req, res) => {
  try {
    const { teamId, workId } = req.params || {};

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

    const works = await Team.removeWork(teamId, workId);

    if (!works) {
      return res.status(400).json({
        error: "Team id is required",
      });
    }

    res.status(204).json({});
  } catch (error) {
    console.log("Error on removeWork controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateWork = async (req, res) => {
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

    if (!title || !description) {
      return res.status(400).json({
        error: "nothing to update",
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

    const works = await Team.updateWork(teamId, workId, { title, description });

    if (!works) {
      return res.status(400).json({
        error: "Nothing to update",
      });
    }

    res.status(200).json({
      message: "Work has been updated",
      works,
    });
  } catch (error) {
    console.log("Error on updateWork controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getWorks = async (req, res) => {
  try {
    const { teamId } = req.params || {};

    if (!teamId) {
      return res.status(400).json({
        error: "Team id is required",
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

    const works = prepareWorksRes(Team.getWorks(teamId));

    res.status(200).json({
      data: works,
    });
  } catch (error) {
    console.log("Error on getWorks controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getWork = async (req, res) => {
  try {
    const { teamId, workId } = req.params || {};

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

    res.status(200).json({
      data: work,
    });
  } catch (error) {
    console.log("Error on getWork controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const assignWork = async (req, res) => {
  try {
    const { teamId, workId, userId } = req.params || {};

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

    if (!userId) {
      return res.status(400).json({
        error: "user id is required",
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

    const addedUser = await Team.assignUser(teamId, workId, userId);

    if (!addedUser) {
      return res.status(400).json({
        error: "user id is required",
      });
    }

    res.status(200).json({
      data: addedUser,
    });
  } catch (error) {
    console.log("Error on assignWork controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const removeAssignned = async (req, res) => {
  try {
    const { teamId, workId, userId } = req.params || {};

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

    if (!userId) {
      return res.status(400).json({
        error: "user id is required",
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

    const removesUser = await Team.removeAssigned(teamId, workId, userId);

    if (!removesUser) {
      return res.status(400).json({
        error: "user id is required",
      });
    }

    res.status(200).json({
      data: "User has been removed from work",
    });
  } catch (error) {
    console.log("Error on removeAssignned controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addWork,
  removeWork,
  updateWork,
  getWorks,
  getWork,
  assignWork,
  removeAssignned,
};
