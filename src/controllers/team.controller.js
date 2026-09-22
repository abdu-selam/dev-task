const Team = require("../models/team.model");
const Users = require("../models/user.model");
const { formatMembersArray } = require("../services/team.service");

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

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params || {};

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

    await Team.deleteTeam(teamId);

    res.status(204).json({});
  } catch (error) {
    console.log("Error on deleteTeam", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = Team.getTeamsByAdmin(req.user.id);
    let data;

    if (teams.length) {
      data = teams.map((team) => ({
        id: team.id,
        name: team.name,
        description: team.description,
      }));
    }

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("Error on getTeams", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addMembers = async (req, res) => {
  try {
    const { teamId } = req.params || {};
    const { members } = req.body || {};

    if (!teamId) {
      return res.status(400).json({
        error: "Team is required",
      });
    }

    if (!Array.isArray(members)) {
      return res.status(400).json({
        error: "Members Should be an array",
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

    const filteredUsers = formatMembersArray(members);

    if (!filteredUsers.length) {
      return res.status(400).json({
        error: "",
      });
    }

    const result = await Team.addMembers(filteredUsers, teamId);

    if (!result) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    res.status(200).json({
      message: "Members has been added",
      data: filteredUsers,
    });
  } catch (error) {
    console.log("Error on addMembers", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createTeam,
  addMembers,
  deleteTeam,
  getTeams,
};
