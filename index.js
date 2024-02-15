//Imports
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/database");
const cookieParser = require("cookie-parser");
const users = require("./routes/userRoute");
const score = require("./routes/scoreRoute");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://itc-final-front-eii7k3eyg-es-projects-3b23588b.vercel.app/"], credentials: true }));
// app.use(cors());

//Routes

app.use("/users", users);
app.use("/scores", score);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

async function init() {
  try {
    await connection;
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT, () => {});
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

init();
