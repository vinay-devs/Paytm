const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;
  req.userId = req.headers.userid;
  if (!authHeader) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (req.userId === decodedToken.userId) {
      next();
    }
  } catch (error) {
    return res.status(403).json({});
  }
}

module.exports = { authMiddleWare };
