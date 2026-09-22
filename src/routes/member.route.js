const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addMembers,
  removeMembers,
} = require("../controllers/member.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addMembers);
route.delete("/:teamId", protectedRoute, removeMembers);

module.exports = route;
