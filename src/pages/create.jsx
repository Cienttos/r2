import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import Task from "../classes/classTask.js";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = new Task(title, description);

    // Fecha inicio actual
    newTask.updateStartDate();

    if (completed) {
      // Si está marcada como completada, guardo fecha final igual a ahora
      newTask.updateEndDate();
      newTask.completed = true;
    } else {
      newTask.completed = false;
      newTask.date_f = null;
    }

    newTask.dowload();

    setTitle("");
    setDescription("");
    setCompleted(false);

    showSnackbar("Tarea creada y guardada correctamente");
  };

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
      component="main"
    >
      <Typography
        variant="h3"
        component="h1"
        className="text-green-600 font-bold mb-8"
      >
        Welcome to the Create Page
      </Typography>

      <Box
        component="form"
        className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Nombre de la tarea"
          placeholder="Ingrese el nombre de la tarea"
          variant="outlined"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Descripción de la tarea"
          placeholder="Ingrese la descripción de la tarea"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              color="success"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Marcar para completar"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="hover:bg-blue-700"
          size="large"
        >
          Crear Tarea
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
