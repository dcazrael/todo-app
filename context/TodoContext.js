import React, { createContext, useEffect, useState } from 'react';
const defaultState = {
  todos: [],
  addTodos: () => {},
  changeTodos: () => {},
};
const TodoContext = createContext(defaultState);

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const lsTodo = localStorage.getItem('todos');
    if (lsTodo !== null) {
      setTodos(JSON.parse(lsTodo));
    }
  }, []);

  const addTodos = (data) => {
    const lsTodo = JSON.parse(localStorage.getItem('todos')) || [];
    localStorage.setItem('todos', JSON.stringify([...lsTodo, data]));

    setTodos(JSON.parse(localStorage.getItem('todos')));
  };

  const changeTodos = (data) => {
    localStorage.setItem('todos', JSON.stringify(data));

    setTodos(JSON.parse(localStorage.getItem('todos')));
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodos,
        changeTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoContext;
export { TodoProvider };
