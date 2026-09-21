const Users = require("../models/user.model");
const { sendCookie } = require("../utils/cookies");
const { isEmail } = require("../utils/validate");

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({
        error: "Invalid Email Address",
      });
    }

    const user = Users.getUserByEmail(email);
    if (user) {
      return res.status(409).json({
        error: "Email has been registered",
      });
    }

    const saveUser = await Users.createUser({ name, email, password });

    if (!saveUser.status) {
      return res.status(400).json({
        error: saveUser.error,
      });
    }

    sendCookie(res, saveUser.data.token);

    res.status(200).json({
      message: "User registered",
      data: {
        name: saveUser.data.name,
        email: saveUser.data.email,
      },
    });
  } catch (error) {
    console.log("Error on register controller", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
};
