const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addMembers,
  removeMembers,
  updateMember,
  getMembers,
} = require("../controllers/member.controller");

const route = Router();

route.use(protectedRoute);

route.post("/:teamId", addMembers);
route.delete("/:teamId", removeMembers);
route.put("/:teamId/:userId", updateMember);
route.get("/:teamId", getMembers);

module.exports = route;
