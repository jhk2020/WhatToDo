import { combineReducers } from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        id: state.id,
        note: state.note,
        completed: !state.completed
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      debugger;
      return action.todos;
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));
      default:
        return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

export default combineReducers({
  todos, 
  visibilityFilter
})
