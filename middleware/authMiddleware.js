const { getUserByEmail } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passwordMatch = (req, res, next) => {
  if (req.body.password !== req.body.rePassword) {
    res.statusCode = 400;
    res.send({ match: false });
  } else {
    delete req.body.rePassword;
    next();
  }
};
const isNewUser = async (req, res, next) => {
  try {
    const user = await getUserByEmail(req.body.email);
    if (user.length > 0) {
      res.statusCode = 400;
      res.send({ userExists: true });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Token required");
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    } else if (decoded) {
      req.body.userId = decoded._id;
      req.body.name = decoded.name;
      next();
    } else {
      res.status(500).send("Error verifying token");
    }
  });
};
module.exports = {
  passwordMatch,
  isNewUser,
  auth,
};
