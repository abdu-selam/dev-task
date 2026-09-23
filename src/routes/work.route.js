const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addWork,
  removeWork,
  updateWork,
  getWorks,
} = require("../controllers/work.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addWork);
route.delete("/:teamId/:workId", protectedRoute, removeWork);
route.put("/:teamId/:workId", protectedRoute, updateWork);
route.get("/:teamId", protectedRoute, getWorks);

module.exports = route;
