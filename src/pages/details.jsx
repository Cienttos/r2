import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function Details({ task, onSave }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [completed, setCompleted] = useState(task.completed || false);
  const [date_i, setDateI] = useState(task.date_i || "");
  const [date_f, setDateF] = useState(task.date_f || "");

  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setCompleted(task.completed || false);
    setDateI(task.date_i || "");
    setDateF(task.date_f || "");
  }, [task]);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      completed,
      date_i,
      date_f,
    };
    if (onSave) onSave(updatedTask);
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 max-w-lg mx-auto">
      <Typography variant="h4" className="mb-6 text-blue-600 font-bold">
        Detalles y edición de la tarea
      </Typography>

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Descripción"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            color="success"
          />
        }
        label="Completada"
      />

      <TextField
        label="Fecha inicio"
        type="datetime-local"
        value={date_i ? date_i.substring(0, 16) : ""}
        onChange={(e) => setDateI(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Fecha final"
        type="datetime-local"
        value={date_f ? date_f.substring(0, 16) : ""}
        onChange={(e) => setDateF(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={handleSave}
      >
        Guardar cambios
      </Button>
    </Box>
  );
}
