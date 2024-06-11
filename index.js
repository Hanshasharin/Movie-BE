import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./Routers/userRouter.js";


// import cors from 'cors'

import passport from "./passport.js";

 import adminRouter from "./Routers/adminRouter.js";
import movieRouter from "./Routers/movieRouter.js";

 

const app = express();
app.use(express.json());
 app.use(passport.initialize());






app.use ("/api/v1/users",userRouter)
 app.use("/api/v1/admin", adminRouter)
 app.use("/api/v1/movie", movieRouter)

 
 






const port = 3000;



connectDB()





app.get("/", (req, res) => {
  res.send("Hello Worldies!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
