


import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const signin = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.status(500).json({ message: "User creation failed" });
    }

    const token = generateToken({ id: newUserCreated._id, email: newUserCreated.email });

    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({ message: "Signed up successfully!", token });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    // let payload={user:email,pwd:password};
    // const token= generateToken(payload)
    const token = generateToken({ id: user._id, email: user.email });

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Logged in successfully!", token });
  } catch (error) {
    console.error("Error in signin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
