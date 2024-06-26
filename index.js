import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./Routers/userRouter.js";


 import cors from 'cors'
import axios from 'axios'
import passport from "./passport.js";

 import adminRouter from "./Routers/adminRouter.js";
import movieRouter from "./Routers/movieRouter.js";
const app = express();

 
app.use(cors({
  origin:['http://localhost:5173','https://movie-backendserver.onrender.com','https://movie-review-rating-app.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'Authorization-Key'], // Specify the allowed headers
  credentials: true // Allow credentials
  
}));



app.use(express.json());
 app.use(passport.initialize());






app.use ("/api/v1/users",userRouter)
 app.use("/api/v1/admin", adminRouter)
 app.use("/api/v1/movie", movieRouter)

 
 app.get('/proxy/image', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    res.writeHead(200, {
      'Content-Type': response.headers['content-type'],
      'Content-Length': response.headers['content-length'],
      'Access-Control-Allow-Origin': '*' // Add this header
    });
    res.end(response.data, 'binary');
  
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});






const port = process.env.PORT || 3000



connectDB()





app.get("/", (req, res) => {
  res.send("Hello Worldies!");
});

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});
