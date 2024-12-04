
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <Card
      sx={{
        width: '200px',
        height: '220px',
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.title}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption" color="textSecondary">
          Due: {task.dueDate}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button size="small" variant="contained" onClick={onToggle}>
          {task.completed ? 'Unmark' : 'Complete'}
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" variant="outlined" color="error" onClick={onDelete}>
  Delete
</Button>
      </Box>
    </Card>
  );
};

export default TaskItem;