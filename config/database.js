require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "game-app",
  });
  return connection;
};
connection = dbConnect();

module.exports = connection;
