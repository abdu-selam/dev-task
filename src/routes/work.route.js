const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addWork,
  removeWork,
  updateWork,
} = require("../controllers/work.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addWork);
route.delete("/:teamId/:workId", protectedRoute, removeWork);
route.put("/:teamId/:workId", protectedRoute, updateWork);

module.exports = route;
