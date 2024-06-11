import express from "express";

import { getMovies, getMoviesByGenre, search } from "../Controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/getMovies", getMovies)
movieRouter.get("/genre", getMoviesByGenre)
movieRouter.get("/search",search)
export default movieRouter;