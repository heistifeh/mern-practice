import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// app.get("/test", (req, res) => {
//   res.send("testing testing 123");
// });
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//this is what we want to return ass message so we are creating a custom error
// success: false,
// statusCode: statusCode,
// message: message,

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong😥😥😣";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
