const { Router } = require("express");

const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addTask,
  removeTask,
  updateTask,
} = require("../controllers/task.controller");

const route = Router();

route.post("/:teamId/:workId", protectedRoute, addTask);
route.delete("/:teamId/:workId/:taskId", protectedRoute, removeTask);

route.put("/:teamId/:workId/:taskId", protectedRoute, updateTask);

module.exports = route;
