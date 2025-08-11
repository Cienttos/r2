import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.jsx";
import Create from "./pages/Create.jsx";
import Details from "./pages/Details";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 16, background: "#eee", marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 12 }}>Lista de tareas</Link>
        <Link to="/create" style={{ marginRight: 12 }}>Crear tarea</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details" element={<DetailsWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper para Details como página independiente, debe recibir task via state de navegación
import { useLocation, useNavigate } from "react-router-dom";
function DetailsWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  if (!task) {
    // Si no hay task pasada, redirigimos a home
    navigate("/");
    return null;
  }

  const handleSave = (updatedTask) => {
    // Guardar en localStorage
    let tasks = [];
    try {
      const stored = localStorage.getItem("tasks");
      tasks = stored ? JSON.parse(stored) : [];
    } catch {}

    const idx = tasks.findIndex(t => t.date_i === task.date_i && t.title === task.title);
    if (idx !== -1) {
      tasks[idx] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Volver a lista
    navigate("/");
  };

  return <Details task={task} onSave={handleSave} />;
}
