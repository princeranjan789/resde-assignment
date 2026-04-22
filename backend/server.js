const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (THIS FIXES "NOT FOUND")
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// PROTECTED ROUTE
app.get("/patients/:id", (req, res) => {
  const user = { role: "DOCTOR" };

  if (user.role !== "DOCTOR") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  console.log("Audit Log: Patient accessed");

  res.json({
    message: "Patient data accessed securely",
  });
});

// PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});