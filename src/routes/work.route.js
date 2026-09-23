const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addWork,
  removeWork,
  updateWork,
  getWorks,
  getWork,
  assignWork,
  removeAssignned,
} = require("../controllers/work.controller");

const route = Router();

route.use(protectedRoute);

route.post("/:teamId", addWork);

route.delete("/assign/:teamId/:workId/:userId", removeAssignned);
route.delete("/:teamId/:workId", removeWork);

route.put("/assign/:teamId/:workId/:userId", assignWork);
route.put("/:teamId/:workId", updateWork);

route.get("/:teamId", getWorks);
route.get("/:teamId/:workId", getWork);

module.exports = route;
