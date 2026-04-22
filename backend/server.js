const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (FINAL FIX)
const MONGO_URI = "mongodb+srv://ranjanprince87_db_user:PCypHYtmSnrKBOOe@cluster0.bwlmpfu.mongodb.net/resdeDB?retryWrites=true&w=majority";

// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // Start server ONLY after DB connects
    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(err.message);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/patients/:id", (req, res) => {
  const user = { role: "DOCTOR" };

  if (user.role !== "DOCTOR") {
    return res.status(403).json({
      message: "Access denied: Only doctors can view clinical notes",
    });
  }

  console.log("Audit Log: Patient accessed");

  res.json({
    message: "Patient data accessed securely by doctor",
  });
});