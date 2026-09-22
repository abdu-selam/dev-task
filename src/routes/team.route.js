const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  createTeam,
  addMembers,
  deleteTeam,
  getTeams,
} = require("../controllers/team.controller");

const route = Router();

route.post("/", protectedRoute, createTeam);
route.get("/", protectedRoute, getTeams);
route.delete("/:teamId", protectedRoute, deleteTeam);

route.post("/members/:teamId", protectedRoute, addMembers);

module.exports = route;
