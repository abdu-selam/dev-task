const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  createTeam,
  deleteTeam,
  getTeams,
  getTeam,
  updateTeam,
  stats,
} = require("../controllers/team.controller");

const route = Router();

route.use(protectedRoute);

route.post("/", createTeam);
route.get("/", getTeams);
route.get("/stat", stats);
route.get("/:teamId", getTeam);
route.put("/:teamId", updateTeam);
route.delete("/:teamId", deleteTeam);

module.exports = route;
