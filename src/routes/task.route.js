const { Router } = require("express");

const { protectedRoute } = require("../middlewares/auth.middleware");
const { addTask, removeTask } = require("../controllers/task.controller");

const route = Router();

route.post("/:teamId/:workId", protectedRoute, addTask);
route.delete("/:teamId/:workId/:taskId", protectedRoute, removeTask);

module.exports = route;
