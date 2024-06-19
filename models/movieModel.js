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
      // maxLength: 1000,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      // enum: ["Sci-Fi", "Thriller", "Romance", "Action", "Comedy"], // Define enum options

      required: true,
    maxLength: 50,
    },
    cast: {
        type: String,
        required: true,
        // maxLength: 1000,
      },
    director: {
      type: String,
      required: true,
      maxLength: 50,
    },
    languag: {
      type: String,
      // required: true,
      maxLength: 50,
    },

    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
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
movieSchema.index({ title: 'text', description: 'text', genre: 'text', cast: 'text', director: 'text' });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
