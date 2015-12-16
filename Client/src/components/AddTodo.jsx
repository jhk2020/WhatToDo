import React from 'react';
import { connect } from 'react-redux';
import { addTodoToDB } from '../action_creators';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodoToDB(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
