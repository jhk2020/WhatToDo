function addTodo (todo) {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export function addTodoToDB (todo)  {
  return (dispatch) => {
    $.ajax({
      method: 'POST',
      url: '/todos', 
      data: JSON.stringify({todo}), 
      dataType: 'json',
      contentType: 'application/json'
    }).done(function(data) {
        dispatch(addTodo(data));
      });
  }
}

function loadTodos (todos) {
  return {
    type: 'LOAD_TODOS',
    todos
  }
}

export function fetchTodos () {
  return (dispatch) => {
    $.get('/todos', function(data) {
      dispatch(loadTodos(data));
    });
  }
}

export function setVisibilityFilter (filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

function toggleTodo (id) {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export function toggleTodoAsync (id) {
  return (dispatch) => {
    $.post('/update/' + id, function(data) {
      dispatch(toggleTodo(data.id));
    })
  }
}
