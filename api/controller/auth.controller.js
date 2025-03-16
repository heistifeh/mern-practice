import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

export const signInLogic = async (req, res, next) => {
  try {
    // res.status(201).send({ message: "User created successfully" });
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "user not found bro"));
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(404, "wrong credentials"));

    // then we authenticate user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //WE DONT WANT TO SEND THE PASSWORD TO THE CLIENT
    const { password: pass, ...detailsWithoutPassword } = user._doc; //destructuring and setting to pass because we already have  const password and we dont want to overwrite it, also we cant use a different variable name because we are destructuring the userDetails, has to be the actual variable name.
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .send(detailsWithoutPassword);
  } catch (error) {
    next(errorHandler(505, "error from my function fuck.😡"));
  }
};
