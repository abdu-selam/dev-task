const protectedRoute = async (req, res, next) => {
  try {
    const { access } = req.cookies || {};

    if (!access) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const user = Users.getUserByToken(access);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error on protectedRoute", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  protectedRoute,
};
