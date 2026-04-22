import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// ✅ IMPORTANT: production backend URL
const API = "https://resde-assignment.onrender.com";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/patients`)
      .then((res) => setPatients(res.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to load data from server");
      });
  }, []);

  return (
    <div className="container">
      <h1>🩺 Doctor Dashboard</h1>

      {error && <div className="error">{error}</div>}

      <div className="grid">
        {patients.map((p) => (
          <div key={p.id} className="card">
            <h2>{p.name}</h2>
            <p>Age: {p.age}</p>
            <span className={`badge ${p.status.toLowerCase()}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}