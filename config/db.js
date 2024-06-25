

import mongoose from "mongoose";
import dotenv from "dotenv";
// import { ensureIndexes } from "../Controllers/movieController.js";

dotenv.config(); // Load environment variables from .env file

const DB_URL = process.env.DB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected");
    // ensureIndexes();
     // Create indexes on application startup

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Export other database-related functions or models if needed
