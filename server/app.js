const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const plotRoutes = require("./routes/plotRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://realestate-rho-gray.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/api/plots", plotRoutes);

module.exports = app;