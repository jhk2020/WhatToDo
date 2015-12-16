import React from 'react';

const Todo = ({
  onClick,
  completed,
  note
}) => (
  <li onClick={onClick} 
      style={{ textDecoration: completed ? 'line-through' : 'none'}}
  > 
    {note} 
  </li>
)

export default Todo;
