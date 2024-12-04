// src/redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now(),
        completed: false,
      });
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index > -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, movedTask);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleCompleted,
  setFilter,
  setSearchQuery,
  reorderTasks,
} = tasksSlice.actions;

export const selectFilteredTasks = (state) => {
  const { tasks, filter, searchQuery } = state.tasks;
  const currentDate = new Date();

  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filter === 'completed') filteredTasks = filteredTasks.filter((task) => task.completed);
  if (filter === 'pending') filteredTasks = filteredTasks.filter((task) => !task.completed);
  if (filter === 'overdue')
    filteredTasks = filteredTasks.filter((task) =>
      new Date(task.dueDate) < currentDate
    );

  return filteredTasks;
};

export default tasksSlice.reducer;
