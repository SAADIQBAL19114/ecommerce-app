const JWT = require("jsonwebtoken");
const { User } = require("../sequelize/models");

//Protected routes

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Token not found",
      error,
    });
  }
};

// isAdmin middleware

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: {id : req.user.id } });
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
