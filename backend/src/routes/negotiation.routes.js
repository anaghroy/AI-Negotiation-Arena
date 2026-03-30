import express from "express";
import {
  createSession,
  processNegotiation,
} from "../services/negotiation.service.js";
import { createNewSession, getSession } from "../utils/sessionStore.js";
import Game from "../models/game.model.js";
import Message from "../models/message.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Start game
router.post("/start", (req, res) => {
  const { playerName } = req.body;
  const sessionId = Date.now().toString();

  const session = createSession();
  session.playerName = playerName || "Anonymous";
  createNewSession(sessionId, session);

  res.json({
    sessionId,
    message: `Starting price is ₹${session.currentPrice}. Convince me.`,
    price: session.currentPrice,
  });
});

// Negotiate
router.post("/offer", async (req, res) => {
  const { sessionId, message } = req.body;
  const session = getSession(sessionId);

  if (!session) {
    return res.status(400).json({ error: "Invalid session" });
  }
  await Message.create({
    sessionId,
    sender: "user",
    text: message,
    round: session.rounds,
  });

  const result = processNegotiation(session, message);
  await Message.create({
    sessionId,
    sender: "ai",
    text: result.message,
    price: result.price,
    round: session.rounds,
  });

  //Save game if done
  if (result.done) {
    await Game.create({
      sessionId,
      playerName: session.playerName,
      finalPrice: result.price,
      rounds: session.rounds,
      personality: session.personality,
    });
  }

  res.json(result);
});

// Leaderboard
router.get("/leaderboard", protect, async (req, res) => {
  const games = await Game.find()
    .sort({ finalPrice: 1 }) // lowest price first
    .limit(10);

  res.json(games);
});

export default router;
