import express from "express";

import { signin } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { createReview, getReviews } from "../Controllers/reviewContoller.js";
import { getMovies } from "../Controllers/movieController.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);
userRouter.post("/login", login)
userRouter.post("/addreview",createReview)
userRouter.get("/getmovie", getMovies)
userRouter.get("/getreview",getReviews)
export default userRouter;