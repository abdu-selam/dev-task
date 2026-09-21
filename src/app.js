const express = require("express");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Hello From Server",
  });
});

app.use("/api/user", userRoute);

module.exports = app;
