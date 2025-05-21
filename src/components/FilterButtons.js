import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FilterButtons({handleFilterTasks, filterState}) {
 

  const handleFilterClick = (filter) => {
 handleFilterTasks(filter);
console.log(filterState);
  };
  return (
    <ToggleButtonGroup
      value={filterState}
      exclusive
      onChange={handleFilterClick}
      aria-label="text alignment"
    >
      <ToggleButton value="all" aria-label="left aligned">
       <h2>All</h2>
      </ToggleButton>
      <ToggleButton  value="completed" aria-label="centered">
       <h2>Completed</h2>
      </ToggleButton>
      <ToggleButton value="uncompleted" aria-label="right aligned">
       <h2>Uncompleted</h2>
      </ToggleButton>
  
    </ToggleButtonGroup>
  );
}
