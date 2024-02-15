const Score = require("./Score");
const addScore = async ({ userId, nickname, score }) => {
  try {
    const newScore = await Score.create({ user: userId, nickname, score });
    return newScore;
  } catch (err) {
    console.log(err);
  }
};

const getAllUserScores = async (userId) => {
  try {
    const allUsersScores = await Score.find({ user: userId });
    return allUsersScores;
  } catch (err) {
    console.log(err);
  }
};

const getAllScores = async () => {
  try {
    const allScores = await Score.find();
    return allScores;
  } catch (err) {
    console.log(err);
  }
};

const lastScore = async (nickname) => {
  try {
    const latestScores = await Score.find({ nickname: nickname }).sort({
      date: -1,
    });
    return latestScores;
  } catch (err) {
    console.log(err);
  }
};

const highestScore = async (nickname) => {
  try {
    const latestHighScore = await Score.find({ nickname: nickname })
                                       .sort({ score: -1, date: -1 })
                                       .exec();
console.log("latestHighScore",latestHighScore)
    return latestHighScore;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addScore,
  getAllScores,
  getAllUserScores,
  lastScore,
  highestScore,
};
