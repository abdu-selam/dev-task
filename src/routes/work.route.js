const { Router } = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const { addWork } = require("../controllers/work.controller");

const route = Router();

route.post("/:teamId", protectedRoute, addWork);

module.exports = route;
