const { Router } = require("express");

const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addTask,
  removeTask,
  updateTask,
  checkTask,
} = require("../controllers/task.controller");

const route = Router();

route.use(protectedRoute);

route.post("/:teamId/:workId", addTask);
route.delete("/:teamId/:workId/:taskId", removeTask);

route.put("/check/:teamId/:workId/:taskId", checkTask);
route.put("/:teamId/:workId/:taskId", updateTask);

module.exports = route;
