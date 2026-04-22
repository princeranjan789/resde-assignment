const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ FIX CORS (IMPORTANT)
app.use(
  cors({
    origin: "*", // allow all (for assignment)
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// HEALTH ROUTE
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// PATIENT API
app.get("/patients/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Rahul Sharma",
    age: 30,
    status: "Pending",
  });
});

// MongoDB (optional, safe)
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("MongoDB skipped"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});