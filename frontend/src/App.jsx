import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("https://resde-assignment.onrender.com/patients/1")
      .then((res) => res.json())
      .then((data) => {
        // Convert single object to array for UI
        setPatients([data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Doctor Dashboard</h1>

      {patients.map((p, index) => (
        <div className="card" key={index}>
          <h2>{p.name}</h2>
          <p>Age: {p.age || 25}</p>
          <span className="status">{p.status}</span>
        </div>
      ))}
    </div>
  );
}

export default App;