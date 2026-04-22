const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// PROTECTED ROUTE (SIMULATED ROLE CHECK)
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

// ✅ IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});