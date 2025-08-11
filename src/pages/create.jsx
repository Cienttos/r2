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
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (msg, severity = "success") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const hasLetters = (str) => /[a-zA-Z]/.test(str);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      showSnackbar("Título y descripción no pueden estar vacíos", "error");
      return;
    }

    if (!hasLetters(title)) {
      showSnackbar("El título debe contener texto, no solo números", "error");
      return;
    }

    if (!hasLetters(description)) {
      showSnackbar("La descripción debe contener texto, no solo números", "error");
      return;
    }

    const newTask = new Task(title, description);

    newTask.updateStartDate();

    if (completed) {
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

    showSnackbar("Tarea creada y guardada correctamente", "success");
  };

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
      component="main"
    >
      <Typography
        variant="h3"
        component="h1"
        className="text-blue-600 font-bold mb-8"
      >
        Crear Nueva Tarea
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
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
