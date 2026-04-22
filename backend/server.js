const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (THIS FIXES YOUR ISSUE)
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// ✅ HEALTH ROUTE
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ SAMPLE ROUTE (TEST)
app.get("/patients/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Test Patient",
    status: "Active",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});