const jwt = require("jsonwebtoken");

const isOwnerLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "invalid token format",
      });
    }

    const decoded = jwt.verify(token, "myjwtsecret123");

    req.owner = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
      error: error.message,
    });
  }
};

module.exports = isOwnerLoggedIn;