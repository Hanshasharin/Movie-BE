import express from "express";

import { getMovieById, getMovies, getMoviesByGenre, search } from "../Controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/getMovies", getMovies)
movieRouter.get("/genre", getMoviesByGenre)
movieRouter.get("/search",search)
movieRouter.get("/getmovies/:movieId" , getMovieById)
export default movieRouter;