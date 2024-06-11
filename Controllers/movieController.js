import Movie from "../models/movieModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import mongoose from "mongoose";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("reviews"); // Fetch all movies
    if (!movies) {
      return res.status(404).send("No movies found");
    }
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Failed to fetch movies", error);
    return res.status(500).send("Failed to fetch movies");
  }
};

// export const rateMovies = async (req, res) => {
//   try {
//     // Fetch movies and populate reviews
//     const movies = await Movie.find().populate('reviews');

//     // Calculate average rating for each movie and update the avgRating field
//     for (let movie of movies) {
//       if (movie.reviews.length > 0) {
//         const totalRatings = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
//         movie.avgRating = totalRatings / movie.reviews.length;
//       } else {
//         movie.avgRating = 0; // Set default average rating if there are no reviews
//       }

//       // Save the updated avgRating back to the database
//       await movie.save();
//     }

//     // Send the response with movies including avgRating
//     res.status(200).json(movies);
//   } catch (error) {
//     console.log("Something went wrong", error);
//     res.status(500).send("Failed to fetch movies");
//   }
// };

export const addMovie = async (req, res) => {
  try {
    console.log("hitted");
    if (!req.file) {
      return res.send("file is not visible");
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
        title,
        description,
        releaseDate,
        genre,
        cast,
        director,
        language,
        avgRating,
        trailerUrl,
        reviews,
      } = body;

      const addMovie = new Movie({
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
        reviews,
      });

      const newMovieAdded = await addMovie.save();
      if (!newMovieAdded) {
        return res.send("movie is not added");
      }
      return res.send(newMovieAdded);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to add a movie");
  }
};

export const getMoviesByGenre = async (req, res) => {
  try {
    // Extract the genre from the request query parameters
    const { genre } = req.query;
    console.log("Genre:", genre);

    // Fetch movies that match the specified genre
    const movies = await Movie.find({
      genre: { $regex: new RegExp(genre, "i") },
    }).populate("reviews");

    // Check if any movies were found
    if (!movies || movies.length === 0) {
      return res.status(404).send("No movies found for the specified genre");
    }

    // Return the movies with populated reviews
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Failed to fetch movies by genre", error);
    return res.status(500).send("Failed to fetch movies by genre");
  }
};

// export const getMoviesByGenre = async (req, res) => {
//   try {
//     // Extract the genre from the request query parameters
//     const { genre } = req.query;
//     console.log("Genre:", genre);

//     // Fetch movies that match the specified genre
//     const movies = await Movie.find({ genre: genre }).populate('reviews');

//     // Check if any movies were found
//     if (!movies || movies.length === 0) {
//       return res.status(404).send("No movies found for the specified genre");
//     }

//     // Return the movies with populated reviews
//     return res.status(200).json(movies);
//   } catch (error) {
//     console.error("Failed to fetch movies by genre", error);
//     return res.status(500).send("Failed to fetch movies by genre");
//   }
// };

export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate the movieId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    // Delete the movie
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Failed to delete movie", error);
    return res.status(500).send("Failed to delete movie");
  }
};

export const search = async (req, res) => {
  try {
    // Ensure text indexes are created
    await Movie.collection.createIndex({
      title: "text",
      description: "text",
      genre: "text",
      cast: "text",
      director: "text",
    });

    const { query } = req.query;
    const movies = await Movie.find({ $text: { $search: query } });
    res.json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
};
