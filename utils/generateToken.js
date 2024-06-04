
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const secret_key = process.env.JWT_SECRET_KEY;

if (!secret_key) {
  throw new Error("JWT secret key is not defined");
}

export const generateToken = (payload) => {
  return jwt.sign(payload, secret_key, { expiresIn: "1d" });
};
