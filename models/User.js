const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickname: { type: "string", required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
  gamesPlayed: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
