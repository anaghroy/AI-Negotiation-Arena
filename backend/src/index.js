import express from "express";
import cors from "cors";
import negotiationRoutes from "./routes/negotiation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/negotiation", negotiationRoutes);

app.get("/", (req, res) => {
  res.send("AI Negotiation Arena Backend Running");
});

export default app;
