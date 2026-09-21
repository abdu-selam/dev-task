const { NODE_ENV } = require("./env");

const sendCookie = (res, token) => {
  res.cookie("access", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  sendCookie,
};
