const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const { addMembers } = require("../controllers/member.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addMembers);

module.exports = route;
