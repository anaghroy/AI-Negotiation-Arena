import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    playerName: {
      type: String,
      default: "Anonymous",
    },

    finalPrice: {
      type: Number,
      required: true,
    },

    initialPrice: {
      type: Number,
      default: 5000,
    },

    rounds: {
      type: Number,
      default: 0,
    },

    personality: {
      type: String,
      enum: ["stubborn", "neutral", "motivated"],
    },

    patienceLeft: {
      type: Number,
    },

    success: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);