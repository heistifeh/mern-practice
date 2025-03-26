import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
export const testLogic = (req, res) => {
  res.send("testing testing 123");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "you can only update your account"));
  try {
    const { id } = req.params;
    //we firstly check is password is being updated then we has before setting it

    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...detailsWithoutPassword } = updatedUser._doc;
    res.status(200).send(detailsWithoutPassword);
  } catch (error) {
    next(error);
  }
};


