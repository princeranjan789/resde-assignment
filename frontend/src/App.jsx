import React from "react";

const patients = [
  { id: 1, name: "Rahul Sharma", age: 30, status: "Pending" },
  { id: 2, name: "Anita Verma", age: 25, status: "Confirmed" },
  { id: 3, name: "Rohit Singh", age: 40, status: "Completed" },
];

const getStatusColor = (status) => {
  if (status === "Pending") return "bg-yellow-400";
  if (status === "Confirmed") return "bg-green-500";
  if (status === "Completed") return "bg-blue-500";
};

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor Dashboard</h1>

      {patients.map((patient) => (
        <div
          key={patient.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2>{patient.name}</h2>
          <p>Age: {patient.age}</p>
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              color: "white",
              backgroundColor:
                patient.status === "Pending"
                  ? "orange"
                  : patient.status === "Confirmed"
                  ? "green"
                  : "blue",
            }}
          >
            {patient.status}
          </span>
        </div>
      ))}
    </div>
  );
}