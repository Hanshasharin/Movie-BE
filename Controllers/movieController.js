import Movie from "../models/movieModel.js";
import upload from "../middlewares/upload.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// export const getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().populate('reviews');
//     res.send(movies);
//     movies.forEach(movie => {
//       if (movie.reviews.length > 0) {
//         const totalRatings = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
//         movie.avgRating = totalRatings / movie.reviews.length;
//       } else {
//         movie.avgRating = 0; // Set default average rating if there are no reviews
//       }
//     })
//   } catch (error) {
//     console.log("something went wrong", error);
//     res.status(500).send("Failed to fetch movies");
//   }
// };

// export const getMovies = async (req, res) => {
//   try {
//     // Fetch movies and populate reviews
//     const movies = await Movie.find().populate('reviews');

//     // Calculate average rating for each movie
//     movies.forEach(movie => {
//       if (movie.reviews.length > 0) {
//         const totalRatings = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
//         movie.avgRating = totalRatings / movie.reviews.length;
//       } else {
//         movie.avgRating = 0; // Set default average rating if there are no reviews
//       }
//     });

//     // Send the response with movies including avgRating
//     res.status(200).json(movies);
//   } catch (error) {
//     console.log("Something went wrong", error);
//     res.status(500).send("Failed to fetch movies");
//   }
// };
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies
    if (!movies) {
      return res.status(404).send("No movies found");
    }
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Failed to fetch movies", error);
    return res.status(500).send("Failed to fetch movies");
  }
};


export const rateMovies = async (req, res) => {
    try {
      // Fetch movies and populate reviews
      const movies = await Movie.find().populate('reviews');
  
      // Calculate average rating for each movie
      movies.forEach(movie => {
        if (movie.reviews.length > 0) {
          const totalRatings = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
          movie.avgRating = totalRatings / movie.reviews.length;
        } else {
          movie.avgRating = 0; // Set default average rating if there are no reviews
        }
      });
  
      // Send the response with movies including avgRating
      res.status(200).json(movies);
    } catch (error) {
      console.log("Something went wrong", error);
      res.status(500).send("Failed to fetch movies");
    }
  };




export const addMovie = async (req, res) => {
  try {
    console.log("hitted");
    if(!req.file) {
    return res.send("file is not visible")
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

      const { title, description, releaseDate, genre, cast, director, language, avgRating, trailerUrl, reviews} = body;

      // const findInstructor = await Instructor.findOne({ email: instructorEmail });

      // if (!findInstructor) {
      //   return res.send("please add instructor first");
      // }

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
        reviews
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

// const totalRatings = getMovies.reviews.reduce((sum, review) => sum + review.rating, 0);
;
