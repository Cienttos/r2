import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

export default function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = React.useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleView = (task) => {
    const html = `
      <html>
        <head><title>Vista Tarea</title></head>
        <body style="font-family:sans-serif; padding: 20px;">
          <h1>${task.title}</h1>
          <p><strong>Descripción:</strong> ${task.description}</p>
          <p><strong>Fecha inicio:</strong> ${task.date_i || "Sin fecha"}</p>
          <p><strong>Fecha final:</strong> ${task.date_f || "Sin fecha"}</p>
          <p><strong>Completada:</strong> ${task.completed ? "Sí" : "No"}</p>
        </body>
      </html>
    `;
    const newWin = window.open();
    newWin.document.write(html);
    newWin.document.close();
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    if (newTasks[index].completed) {
      newTasks[index].date_f = new Date().toISOString();
    } else {
      newTasks[index].date_f = null;
    }
    saveTasks(newTasks);
    setSnackbar({ open: true, msg: "Estado completado actualizado", severity: "info" });
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    saveTasks(newTasks);
    setSnackbar({ open: true, msg: "Tarea eliminada", severity: "warning" });

    if (selectedTask && tasks[index] === selectedTask) {
      setSelectedTask(null);
    }
  };

  const handleSaveDetails = (updatedTask) => {
    const idx = tasks.findIndex((t) => t === selectedTask);
    if (idx === -1) return;

    const newTasks = [...tasks];
    newTasks[idx] = updatedTask;
    saveTasks(newTasks);
    setSelectedTask(updatedTask);
    setSnackbar({ open: true, msg: "Tarea actualizada", severity: "success" });
  };

  const handleEditPage = (task) => {
    navigate("/details", { state: { task } });
  };

  return (
    <Box className="p-6 max-w-7xl mx-auto">
      <Typography variant="h4" className="mb-4 font-bold text-blue-600">
        Lista de tareas
      </Typography>

      {tasks.length === 0 ? (
        <Typography>No hay tareas guardadas.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha inicio</TableCell>
                <TableCell>Fecha final</TableCell>
                <TableCell>Completada</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index} hover selected={selectedTask === task}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {task.description.length > 30
                      ? task.description.substring(0, 30) + "..."
                      : task.description}
                  </TableCell>
                  <TableCell>{task.date_i ? new Date(task.date_i).toLocaleString() : "-"}</TableCell>
                  <TableCell>{task.date_f ? new Date(task.date_f).toLocaleString() : "-"}</TableCell>
                  <TableCell>{task.completed ? "✔️" : "❌"}</TableCell>

                  <TableCell align="center" style={{ minWidth: 180 }}>
                    <Tooltip title="Ver tarea en nueva pestaña">
                      <IconButton onClick={() => handleView(task)}>👁️</IconButton>
                    </Tooltip>

                    <Tooltip title={task.completed ? "Marcar como no completada" : "Marcar como completada"}>
                      <IconButton onClick={() => toggleComplete(index)}>✔️</IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar tarea">
                      <IconButton onClick={() => deleteTask(index)}>🗑️</IconButton>
                    </Tooltip>

                    <Tooltip title="Editar tarea (página)">
                      <IconButton onClick={() => handleEditPage(task)}>✏️</IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {selectedTask && (
        <Box mt={6} borderTop="1px solid #ccc" pt={4}>
          <Details task={selectedTask} onSave={handleSaveDetails} />
          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setSelectedTask(null)}
            >
              Cerrar edición
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
