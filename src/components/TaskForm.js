import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addTask, editTask } from '../redux/tasksSlice';

const TaskForm = ({ task = null, onClose = () => {} }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (task?.id) {
      // Edit existing task
      dispatch(editTask({ id: task.id, title, description, dueDate }));
    } else {
      // Add new task
      dispatch(addTask({ title, description, dueDate }));
      clearForm(); // Clear the form after adding a task
    }
    onClose(); // Close the form after submission
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '2rem' }}
    >
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {task ? 'Update Task' : 'Add Task'}
      </Button>
      {task && (
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default TaskForm;
