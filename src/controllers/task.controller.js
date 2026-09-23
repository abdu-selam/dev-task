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
        error: "task title is required",
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

const removeTask = async (req, res) => {
  try {
    const { teamId, workId, taskId } = req.params || {};

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

    if (!taskId) {
      return res.status(400).json({
        error: "task id is required",
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

    await Team.removeTask(teamId, workId, taskId);

    res.status(204).json({});
  } catch (error) {
    console.log("Error on removeTask controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { teamId, workId, taskId } = req.params || {};
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

    if (!taskId) {
      return res.status(400).json({
        error: "task id is required",
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

    if (!title || !description) {
      return res.status(400).json({
        error: "Nothing to update",
      });
    }

    const task = await Team.updateTask(teamId, workId, taskId, {
      title,
      description,
    });

    if (!task) {
      return res.status(400).json({
        error: "task id is required",
      });
    }

    res.status(200).json({
      message: "Task has been updated",
      data: task,
    });
  } catch (error) {
    console.log("Error on updateTask controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const checkTask = async (req, res) => {
  try {
    const { teamId, workId, taskId } = req.params || {};
    const { check } = req.body || {};

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

    if (!taskId) {
      return res.status(400).json({
        error: "task id is required",
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

    const task = await Team.checkTask(teamId, workId, taskId, check);

    if (!task) {
      return res.status(400).json({
        error: "task id is required",
      });
    }

    res.status(200).json({
      message: "Task has been checked",
      data: task,
    });
  } catch (error) {
    console.log("Error on checkTask controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addTask,
  removeTask,
  updateTask,
  checkTask,
};
