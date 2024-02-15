const User = require("../models/User");
const { addUser, getAllUsers, getAdminStatus } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../libs/utilities");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const err = new Error("User doesn't exist");
      err.statusCode = 401;
      return next(err);
    }
    const isValid = await comparePassword(req.body.password, user.password);

    if (isValid) {
      const tokenObject = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", tokenObject, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(200).send({ ok: true, user: user });
    } else {
      const err = new Error("Incorrect password");
      err.statusCode = 401;
      return next(err);
    }
  } catch (error) {
    console.log(error);
    const err = new Error(error);
    err.statusCode = 500;
    next(err);
  }
};

const checkStatus = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

const logout = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, msg: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (decoded) {
      res.clearCookie("token");
      res.status(200).json({ success: true, msg: "Logout successful" });
    } else {
      res.status(401).json({ success: false, msg: "Invalid token" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

const signup = async (req, res) => {
  try {
    await addUser(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
};

const users = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers)
  } catch (error) {
    console.log(error);
  }
}


const adminStatus = async (req, res) => {
  try {
    const adminStatus = await getAdminStatus();
    res.send(adminStatus)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  login,
  checkStatus,
  logout,
  signup,
  users,
  adminStatus
};
