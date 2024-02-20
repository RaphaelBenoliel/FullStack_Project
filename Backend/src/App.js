const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const studentRoute = require("./src/routes/student_route");
const postRoute = require("./src/routes/post_route");
const bodyParser = require("body-parser");

const initApp = () => {
  const promise = new Promise(async (resolve) => {
    const db = mongoose.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => console.log("Database connected"));
    await mongoose.connect(process.env.DATABASE_URL);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/student", studentRoute);
    app.use("/post", postRoute);
    resolve(app);
  });
  return promise;
};

module.exports = initApp;