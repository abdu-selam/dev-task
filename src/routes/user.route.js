const { Router } = require("express");
const { register, login, logout } = require("../controllers/user.controller");

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.delete("/logout", logout);

module.exports = route;
