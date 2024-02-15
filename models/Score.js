const mongoose = require("mongoose");
const { Schema } = mongoose;
const scoreSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  nickname: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
