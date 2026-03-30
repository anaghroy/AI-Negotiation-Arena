import express from "express";
import cors from "cors";
import negotiationRoutes from "./routes/negotiation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/negotiation", negotiationRoutes);

app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.send("AI Negotiation Arena Backend Running");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;
