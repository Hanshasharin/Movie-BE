// import express from "express";
// import passport from "passport";
// import { adminLogin, deleteUser, getUserList, signupAdmin } from "../Controllers/adminController.js";
// import { addMovie  } from "../Controllers/movieController.js";
// import upload from "../middlewares/upload.js";

// const adminRouter= express.Router();

// adminRouter.post("/signupAdmin", signupAdmin)
// adminRouter.post("/loginAdmin", adminLogin)
// adminRouter.get('/users', passport.authenticate('jwt', { session: false }), getUserList);
// adminRouter.delete('/delete-user/:id', passport.authenticate('jwt', { session: false }), deleteUser); 
// adminRouter.post("/addmovie",upload.single("image"), addMovie);

// export default adminRouter

import express from "express";
import passport from "passport";
import { adminLogin, deleteUser, getUserList, signupAdmin } from "../Controllers/adminController.js";
import { addMovie, deleteMovie } from "../Controllers/movieController.js";
import upload from "../middlewares/upload.js"; // Importing upload middleware

const adminRouter = express.Router();

adminRouter.post("/signupAdmin", signupAdmin);
adminRouter.post("/loginAdmin", adminLogin);
adminRouter.get('/users', passport.authenticate('jwt', { session: false }), getUserList);
adminRouter.delete('/delete-user/:id', passport.authenticate('jwt', { session: false }), deleteUser); 
adminRouter.post("/addmovie",passport.authenticate('jwt' , { session:false}), upload.single("image"), addMovie); // Using upload middleware
adminRouter.delete("/delete/:movieId" , deleteMovie)

export default adminRouter;

