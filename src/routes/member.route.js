const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addMembers,
  removeMembers,
  updateMember,
  getMembers,
} = require("../controllers/member.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addMembers);
route.delete("/:teamId", protectedRoute, removeMembers);
route.put("/:teamId/:userId", protectedRoute, updateMember);
route.get("/:teamId", protectedRoute, getMembers);

module.exports = route;
