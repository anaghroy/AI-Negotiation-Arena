import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Alias/NeuralID already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // For prototyping, we return the user document
    res.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        totalGames: newUser.totalGames,
        bestPrice: newUser.bestPrice,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to initialize entity." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        totalGames: user.totalGames,
        bestPrice: user.bestPrice,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to verify entity." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token",{
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "strict",
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
