import Review from "../models/reviewModel.js";
import Movie from "../models/movieModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// export const createReview = async (req, res) => {
//   try {
//     const { user, movie, rating, review } = req.body;

//     // Check if the movie exists
//     console.log("Movie ID:", movie);

//     const movieExists = await Movie.findById(movie);
//     if (!movieExists) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }

//     const userExists = await User.findById(user);
//     if (!userExists) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const newReview = new Review({
//       user,
//       movie,
//       rating,
//       review
//     });

//     const savedReview = await newReview.save();

//     // Update the movie document to include this review
//     movieExists.reviews.push(savedReview._id); // Push the new review's ID into the movie's reviews array
//     await movieExists.save(); // Save the updated movie document

//     const populatedReview = await Review.findById(savedReview._id)
//     .populate('user', 'email')
//     .populate('movie', 'title')
//     .exec();

//     res.status(201).json(populatedReview);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { movieId } = req.params;
    const userId = req.user._id; // Get the authenticated user's ID from req.user

    // Check if the movie exists
    console.log("Movie ID:", movieId);
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Create and save the new review
    const newReview = new Review({
      user: userId,
      movie: movieId,
      rating,
      review,
    });

    const savedReview = await newReview.save();

    // Update the movie document to include this review
    movieExists.reviews.push(savedReview._id); // Push the new review's ID into the movie's reviews array
    await movieExists.save(); // Save the updated movie document

    const populatedReview = await Review.findById(savedReview._id)
      .populate("user", "email")
      .populate("movie", "title")
      .exec();

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    console.log(`Fetching reviews for movie ID: ${movieId}`); // Debug log

    const reviews = await Review.find({ movie: movieId })

      .populate("user", "firstName") // Assuming user model has a 'firstName' field
      .populate("movie", "title"); // Assuming movie model has a 'title' field

    console.log(`Reviews found: ${reviews.length}`); // Debug log

    if (!reviews.length) {
      return res.status(404).json({ error: "No reviews found" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Validate the reviewId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    // Remove the review reference from the associated movie
    const movie = await Movie.findById(review.movie);
    if (movie) {
      movie.reviews = movie.reviews.filter((r) => r.toString() !== reviewId);
      await movie.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Failed to delete review", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
