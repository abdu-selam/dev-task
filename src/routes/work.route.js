const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const { addWork, removeWork } = require("../controllers/work.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addWork);
route.delete("/:teamId/:workId", protectedRoute, removeWork);

module.exports = route;
