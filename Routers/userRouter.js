import express from "express";
import passport from "passport";
import { getUserProfile, signin } from "../Controllers/userController.js";
import { login } from "../Controllers/userController.js";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../Controllers/reviewContoller.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);
userRouter.post("/login", login);
userRouter.post(
  "/addreview/:movieId",
  passport.authenticate("user-jwt", { session: false }),
  createReview
);
userRouter.get("/getreview/:movieId", getReviews);
userRouter.delete(
  "/delete/:reviewId",
  passport.authenticate("user-jwt", { session: false }),
  deleteReview
);

userRouter.get(
  "/profile",
  passport.authenticate("user-jwt", { session: false }),
  getUserProfile
);

export default userRouter;
