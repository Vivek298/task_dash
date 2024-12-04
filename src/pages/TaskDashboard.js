import React from 'react';
import Filters from '../components/Filters';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskDashboard = () => (
  <div style={{ padding: 20 }}>
    <h1>Task Manager</h1>
    <Filters />
    <TaskForm />
    <TaskList />
  </div>
);

export default TaskDashboard;
