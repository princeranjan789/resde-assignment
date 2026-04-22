import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://resde-assignment.onrender.com/patients/1")
      .then((res) => res.json())
      .then((data) => {
        // Demo multiple cards (since your API returns one)
        const demoData = [
          { ...data, status: "Pending" },
          { ...data, name: "Anita Verma", age: 25, status: "Confirmed" },
          { ...data, name: "Rohit Singh", age: 40, status: "Completed" },
        ];
        setPatients(demoData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    if (status === "Pending") return "pending";
    if (status === "Confirmed") return "confirmed";
    if (status === "Completed") return "completed";
    return "";
  };

  return (
    <div className="app">
      <h1 className="title">Doctor Dashboard</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {patients.map((p, index) => (
          <div className="card" key={index}>
            <h2>{p.name}</h2>
            <p>Age: {p.age}</p>
            <span className={`badge ${getStatusClass(p.status)}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;