const { Router } = require("express");
const {
  register,
  login,
  logout,
  checkLogin,
} = require("../controllers/user.controller");

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.delete("/logout", logout);

route.get("/check", checkLogin);

module.exports = route;
