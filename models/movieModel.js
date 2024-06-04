import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    maxLength: 50,
    },
    cast: {
        type: String,
        required: true,
        maxLength: 1000,
      },
    director: {
      type: String,
      required: true,
      maxLength: 50,
    },
    language: {
      type: String,
      required: true,
      maxLength: 50,
    },

    Reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    
    trailerUrl: {
      type: String,
      
    },
    image: {
        type: String,
        
      },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
