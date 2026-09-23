const { Router } = require("express");

const { protectedRoute } = require("../middlewares/auth.middleware");
const { addTask } = require("../controllers/task.controller");

const route = Router();

route.post("/:teamId/:workId", protectedRoute, addTask);

module.exports = route;
