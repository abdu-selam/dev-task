const express = require("express");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const teamRoute = require("./routes/team.route");
const memberRoute = require("./routes/member.route");
const workRoute = require("./routes/work.route");
const taskRoute = require("./routes/task.route");

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
app.use("/api/member", memberRoute);
app.use("/api/work", workRoute);
app.use("/api/task", taskRoute);

module.exports = app;
