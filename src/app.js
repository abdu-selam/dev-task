const express = require("express");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const teamRoute = require("./routes/team.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Hello From Server",
  });
});

app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);

module.exports = app;
