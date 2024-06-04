import Review from '../models/reviewModel.js';
import Movie from '../models/movieModel.js';

export const createReview = async (req, res) => {
  try {
    const { user, movie, rating, review } = req.body;

    // Check if the movie exists
    const movieExists = await Movie.findById(movie);
    if (!movieExists) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const newReview = new Review({
      user,
      movie,
      rating,
      review
    });

    const savedReview = await newReview.save();

    // Update the movie document to include this review
    movieExists.reviews.push(savedReview._id);
    await movieExists.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId }).populate('user', 'name');

    if (!reviews) {
      return res.status(404).json({ error: 'No reviews found' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
