import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";

export const signupAdmin = async (req, res) => {
  console.log('Received request body:', req.body); // Log the received request body

  try {
    console.log(req.body);

    const { email, password, name } = req.body;

    // Check if an admin already exists
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin with role set to "admin"
    const newAdmin = new Admin({
      name,
      email,
      hashPassword,
      role: "admin",
    });

    // Save the new admin
    const newAdminCreated = await newAdmin.save();

    if (!newAdminCreated) {
      return res.status(500).json({ message: "Admin creation failed" });
    }

    // Send success response
    res.status(201).json({ message: "Admin signed up successfully!"});
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;
    console.log(body);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.send("admin is not found");
    }

    const matchPassword = await bcrypt.compare(password, admin.hashPassword);

    console.log(matchPassword, "matchpassword");
    if (!matchPassword) {
      return res.send("password is not match");
    }

    const token = generateToken({
      id: admin._id,
      role: admin.role,
      email: admin.email,
    });
    res.json({ message: "Logged in!", token });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
};

// to get user list

export const getUserList = async (req, res) => {
  try {
    // Fetch user list sorted by creation date in descending order
    const userList = await User.find({})
      .sort({ createdAt: -1 })
      .populate("userReviews");
    res.status(200).json(userList);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to deleteuser

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
