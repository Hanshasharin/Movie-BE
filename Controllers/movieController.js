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
        languag,
        avgRating,
        trailerUrl,
        category,
        reviews,
      } = body;

      const addMovie = new Movie({
        title,
        description,
        releaseDate,
        genre,
        image: imageUrl,
        cast,
        category,
        director,
        languag,
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

// export const search = async (req, res) => {
//   try {
//     // Ensure text indexes are created
//         console.log("Received search request with query:", req.query);

//     await Movie.collection.createIndex({
//       title: "text",
//       description: "text",
//       genre: "text",
//       cast: "text",
//       director: "text",
//       category:"text"

//     });

//     // const { query } = req.query;
//     // const query = req.query.query;
//     const query = decodeURIComponent(req.query.query);



//     const movies = await Movie.find({ $text: { $search: query } });
//     res.json(movies);
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     res.status(500).json({ error: "Failed to search movies" });
//   }
// };
export const ensureIndexes = async () => {
  try {
    const indexes = await Movie.collection.indexes();
    const indexExists = indexes.some(index => index.name === 'movie_text_index');

    if (!indexExists) {
      await Movie.collection.createIndex(
        {
          title: "text",
          description: "text",
          genre: "text",
          cast: "text",
          director: "text",
          category: "text"
        },
        {
          name: "movie_text_index",
          weights: {
            title: 10,
            description: 5,
            genre: 5,
            cast: 5,
            director: 5,
            category: 5
          }
        }
      );
    }
  } catch (error) {
    console.error("Error ensuring indexes:", error);
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Processed search query:", query);

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const movies = await Movie.find({ $text: { $search: query } });
    res.json(movies);
  } catch (error) {
    console.error("Error occurred during movie search:", error);
    res.status(500).json({ error: "Failed to search movies", details: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate the movieId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    // Fetch the movie by ID and populate its reviews
    const movie = await Movie.findById(movieId).populate("reviews");

    // Check if the movie exists
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Return the movie details
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Failed to fetch movie details", error);
    return res.status(500).send("Failed to fetch movie details");
  }
};


