
import Movie from '../models/movieModel.js';

import Review from '../models/reviewModel.js'
import { cloudinaryInstance } from '../config/cloudinary.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate('reviews');
    console.log(movies);
    res.status(200).send(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createMovie = async (req, res) => {
  try {
    console.log("hitted");
    if (!req.file) {
      return res.status(400).send("File is not visible");
    }
    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      
      const imageUrl = result.url;
      const body = req.body;
      console.log(body, "body");

      const {
        title, description, releaseDate, genre, cast, director, language, avgRating, trailerUrl, reviews
      } = body;

      const createMovie = new Movie({
        title,
        description,
        releaseDate,
        genre,
        image: imageUrl,
        cast,
        director,
        language,
        avgRating,
        trailerUrl,
        reviews
      });

      const newMovieCreated = await createMovie.save();
      if (!newMovieCreated) {
        return res.status(400).send("Movie is not created");
      }
      return res.status(201).send(newMovieCreated);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).send("Failed to create movie");
  }
};
