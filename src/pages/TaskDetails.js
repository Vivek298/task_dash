import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.list.find((t) => t.id === parseInt(id)));

  if (!task) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5">Task not found!</Typography>
        <Button onClick={() => navigate('/tasks')} variant="contained" sx={{ marginTop: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {task.description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Due Date: {task.dueDate}
      </Typography>
      <Button onClick={() => navigate('/tasks')} variant="contained" sx={{ marginTop: 2 }}>
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default TaskDetails;
