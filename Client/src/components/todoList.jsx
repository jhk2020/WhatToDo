import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from './todo';
import { toggleTodoAsync, fetchTodos } from '../action_creators';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
    debugger;
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

class TodoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    let { todos, onTodoClick } = this.props;
    debugger;
    return (
      <ul>
        {todos.map(todo => 
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
          /> 
        )}
      </ul>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodoAsync(id));
    },
    fetchTodos: () => {
      dispatch(fetchTodos());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
