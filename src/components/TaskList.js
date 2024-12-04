// src/components/TaskList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  toggleCompleted,
  deleteTask,
  reorderTasks,
  selectFilteredTasks,
  editTask,
} from '../redux/tasksSlice';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const tasks = useSelector(selectFilteredTasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null); // Manage the editing state

  const handleEdit = (task) => {
    setEditingTask(task); // Open the edit form with the selected task
  };

  const handleCloseEditForm = () => {
    setEditingTask(null); // Close the edit form
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    dispatch(reorderTasks({ sourceIndex: source.index, destinationIndex: destination.index }));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        task={task}
                        onToggle={() => dispatch(toggleCompleted(task.id))}
                        onDelete={() => dispatch(deleteTask(task.id))}
                        onEdit={() => handleEdit(task)} // Open the edit form
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Render the edit form modal */}
      {editingTask && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          <TaskForm
            task={editingTask}
            onClose={handleCloseEditForm}
            onSubmit={(updatedTask) => {
              dispatch(editTask(updatedTask)); // Update the task in the store
              handleCloseEditForm();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
