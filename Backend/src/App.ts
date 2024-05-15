import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRoute from "./routes/user_route";
import postRoute from "./routes/post_route";
import bodyParser from "body-parser";
import authRoute from "./routes/auth_route";
import fileRoute from "./routes/file_route";


const initApp = () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => console.log("Database connected"));
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use("/user", userRoute);
      app.use("/post", postRoute);
      app.use("/auth", authRoute);
      app.use("/file", fileRoute);
      app.use('/uploads', express.static('uploads'));
      resolve(app);
    })
  });
  return promise;
};

export default initApp;