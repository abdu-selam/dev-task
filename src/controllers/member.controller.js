const Team = require("../models/team.model");
const { formatMembersArray } = require("../services/team.service");

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
        error: "Invalid members",
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

const removeMembers = async (req, res) => {
  try {
    const { teamId } = req.params || {};
    const { memberIds } = req.body || {};

    if (!teamId) {
      return res.status(400).json({
        error: "Team is required",
      });
    }

    if (!Array.isArray(memberIds)) {
      return res.status(400).json({
        error: "Member ids Should be an array",
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

    await Team.removeMembers(memberIds, teamId);

    res.status(200).json({
      message: "Members has been removed",
    });
  } catch (error) {
    console.log("Error on removeMembers", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params || {};
    const { name, email, roll, label } = req.body || {};

    if (!teamId) {
      return res.status(400).json({
        error: "Team is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "User is required",
      });
    }

    if (!name || !email || !roll || !label) {
      return res.status(400).json({
        error: "Nothing to update",
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

    await Team.updateMember(teamId, userId, { name, email, roll, label });

    res.status(200).json({
      message: "Members has been updated",
    });
  } catch (error) {
    console.log("Error on updateMember", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getMembers = async (req, res) => {
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

    const members = team.members;

    res.status(200).json({
      data: members,
    });
  } catch (error) {
    console.log("Error on getMembers", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addMembers,
  removeMembers,
  updateMember,
  getMembers,
};
