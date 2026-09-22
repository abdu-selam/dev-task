const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const { createTeam, addMembers } = require("../controllers/team.controller");

const route = Router();

route.post("/", protectedRoute, createTeam);
route.post("/members/:teamId", protectedRoute, addMembers);

module.exports = route;
