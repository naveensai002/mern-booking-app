import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/Auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
app.use(express.json()); //infer the body of the request automatically to json so we don't need to jo json everytime.
app.use(express.urlencoded({ extended: true })); //get the query paramter and all
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});
