import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    role: { 
      type: String,
       enum: ['user', 'admin'],
        default: 'user' },

    userReviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
