import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
    },

    round: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);