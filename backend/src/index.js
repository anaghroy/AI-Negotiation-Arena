import express from "express";
import cors from "cors";
import negotiationRoutes from "./routes/negotiation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, "../public")));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;
