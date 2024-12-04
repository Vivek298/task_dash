import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

const App = () => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => setEditingTask(task);
  const handleCloseForm = () => setEditingTask(null);

  return (
    <Provider store={store}>
      <div style={{ padding: '2rem' }}>
        <h1>Task Manager</h1>
        <SearchBar />
        <Filters />
        {/* Always show the form */}
        <TaskForm task={editingTask} onClose={handleCloseForm} />
        <TaskList onEdit={handleEdit} />
      </div>
    </Provider>
  );
};

export default App;
