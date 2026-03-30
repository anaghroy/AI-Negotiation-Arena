import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    totalGames: {
      type: Number,
      default: 0,
    },

    bestPrice: {
      type: Number,
      default: Infinity,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);