import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signUpLogic = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    //hash password before sending back to database
    if (!password)
      return res.status(400).json({ error: "All fields are required." });
    const hashPassword = bcrypt.hashSync(password, 10); //hashSync already returns a promise
    const newUser = await User.create({
      username,
      password: hashPassword,
      email,
    });
    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(505, "error from my function fuck.😡"));
  }
};
