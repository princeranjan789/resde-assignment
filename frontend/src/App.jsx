import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://resde-assignment.onrender.com";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/patients`)
      .then((res) => setPatients(res.data))
      .catch(() =>
        setError(
          "We couldn’t load patient data right now. Please check connection or try again."
        )
      );
  }, []);

  return (
    <div className="container">
      <h1>🩺 Clinical Dashboard</h1>

      {error && <div className="error">{error}</div>}

      <div className="grid">
        {patients.map((p) => (
          <div className="card" key={p.id}>
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