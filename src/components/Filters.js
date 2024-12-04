import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../redux/tasksSlice';

const Filters = () => {
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (type) => {
    dispatch(setFilter(type));
    if (type === 'all') {
      dispatch(setSearchQuery('')); // Clear the search query when "All" is clicked
    }
  };

  return (
    <ButtonGroup variant="outlined">
      {['all', 'completed', 'pending', 'overdue'].map((type) => (
        <Button
          key={type}
          variant={filter === type ? 'contained' : 'outlined'}
          onClick={() => handleFilterChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Filters;
