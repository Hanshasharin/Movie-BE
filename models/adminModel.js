import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["instructor", "admin"],

    },
    hashPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    movies: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

const  Admin = mongoose.model("Admin", adminSchema);

export default Admin;