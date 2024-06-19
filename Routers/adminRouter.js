

import express from "express";
import passport from "passport";
import { adminLogin, deleteUser, getUserList, signupAdmin } from "../Controllers/adminController.js";
import { addMovie, deleteMovie } from "../Controllers/movieController.js";
import upload from "../middlewares/upload.js"; // Importing upload middleware
import checkAdmin from "../middlewares/checkAdmin.js";
const adminRouter = express.Router();

adminRouter.post("/signupAdmin", signupAdmin);
adminRouter.post("/loginAdmin", adminLogin);
adminRouter.get('/users', passport.authenticate('jwt', { session: false }),checkAdmin, getUserList);
adminRouter.delete('/delete-user/:id', passport.authenticate('jwt', { session: false }), checkAdmin,deleteUser); 
adminRouter.post("/addmovie",passport.authenticate('jwt' , { session:false}), upload.single("image"),checkAdmin, addMovie); // Using upload middleware
adminRouter.delete("/delete/:movieId" , deleteMovie)


export default adminRouter;

