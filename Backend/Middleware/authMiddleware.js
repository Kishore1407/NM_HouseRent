const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token not authorized",
      });
    }
  }
};
const adminAuthorization = () => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};
module.exports = { authentication ,adminAuthorization};
