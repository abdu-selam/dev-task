const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addWork,
  removeWork,
  updateWork,
  getWorks,
  getWork,
  assignWork,
} = require("../controllers/work.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addWork);
route.delete("/:teamId/:workId", protectedRoute, removeWork);

route.put("/assign/:teamId/:workId/:userId", protectedRoute, assignWork);
route.put("/:teamId/:workId", protectedRoute, updateWork);

route.get("/:teamId", protectedRoute, getWorks);
route.get("/:teamId/:workId", protectedRoute, getWork);

module.exports = route;
