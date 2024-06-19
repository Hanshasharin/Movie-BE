import express from "express";
import passport from "passport";
import { signin } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
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

export default userRouter;
