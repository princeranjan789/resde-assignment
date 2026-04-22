const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://resde-assignment.vercel.app"
}));

// 🔐 ROLE BASED MIDDLEWARE
const checkDoctor = (req, res, next) => {
  const role = req.headers["role"];

  if (role !== "DOCTOR") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

// 🧠 SAMPLE DATA
const patients = [
  {
    id: "1",
    name: "Rahul Sharma",
    age: 30,
    status: "Pending",
    clinicalNotes: "High BP"
  },
  {
    id: "2",
    name: "Anita Verma",
    age: 25,
    status: "Confirmed",
    clinicalNotes: "Routine check"
  },
  {
    id: "3",
    name: "Rohit Singh",
    age: 40,
    status: "Completed",
    clinicalNotes: "Diabetes follow-up"
  }
];

// 📊 AUDIT LOG
const auditLog = [];

app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// GET ALL PATIENTS
app.get("/patients", (req, res) => {
  auditLog.push({
    action: "VIEW_ALL",
    time: new Date()
  });

  res.json(patients);
});

// GET CLINICAL NOTES (SECURED)
app.get("/patients/:id/notes", checkDoctor, (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({
      message:
        "We couldn’t find this patient. Please double-check or try again."
    });
  }

  auditLog.push({
    action: "VIEW_NOTES",
    patientId: req.params.id,
    time: new Date()
  });

  res.json({ notes: patient.clinicalNotes });
});

app.get("/audit", (req, res) => {
  res.json(auditLog);
});

app.listen(10000, () => console.log("Server running 🚀"));