const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.NUMSALTROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
const comparePassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

module.exports = { encryptPassword, comparePassword, issueJWT };
