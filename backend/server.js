const express = require("express");
const app = express();

// ROOT ROUTE (MUST WORK)
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// HEALTH ROUTE
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});