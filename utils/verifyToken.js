const jwt = require("jsonwebtoken");
const createError = require("./error");

// VERIFY TOKEN
const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Your are not authorized to access"));
  }
  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err)
      return next(
        createError(401, "Your are not authorized to access, token is invalid")
      );
    req.user = user;
    next();
  });
};

// VERIFY USER
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
      next();
    } else {
      return next(
        createError(401, "Your are not authorized to delete this account")
      );
    }
  });
};

// VERIFY ADMIN
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, "Your are not a authorized admin"));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
