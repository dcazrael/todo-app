import { useContext, useState } from 'react';
import Check from '../../public/icon-check.svg';
import TodoContext from '../context/TodoContext';

const Todos = () => {
  const { todos, changeTodos } = useContext(TodoContext);

  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);

  function toggleState(id) {
    changeTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  }

  function deleteTodo(id) {
    changeTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    changeTodos(todos.filter((todo) => todo.completed !== true));
  }

  return (
    <>
      {todos &&
        todos.map((todo) => {
          if (!active && !todo.completed) return;
          if (!completed && todo.completed) return;
          return (
            <div
              className='flex items-center px-6 py-4 border-b border-gray-200 dark:border-blue-600'
              key={`todo-${todo.id}`}
            >
              <input
                type='checkbox'
                name={`todo-${todo.id}`}
                id={`todo-${todo.id}`}
                checked={todo.completed}
                className='hidden'
                readOnly
              />
              {todo.completed ? (
                <label
                  htmlFor='{`todo-${todo.id}`}'
                  onClick={() => toggleState(todo.id)}
                  className='flex items-center justify-center w-5 h-5 text-gray-100 border border-gray-300 rounded-full cursor-pointer stroke-current stroke-2 dark:border-gray-600 fill-transparent bg-gradient-to-br from-blue-400 to-purple-300'
                >
                  <Check className='w-3 h-3' />
                </label>
              ) : (
                <label
                  htmlFor='{`todo-${todo.id}`}'
                  onClick={() => toggleState(todo.id)}
                  className='w-5 h-5 p-1 border border-gray-300 rounded-full cursor-pointer dark:border-gray-600'
                />
              )}
              <p
                className={`px-2 ml-2 flex-auto font-light ${
                  todo.completed
                    ? 'line-through text-gray-300 dark:text-gray-600'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {todo.text}
              </p>
              <div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className='text-xs text-gray-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-500'
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      <div className='flex items-center justify-between px-6 py-4 text-xs text-gray-400 dark:text-gray-600'>
        <div className='flex-auto'>
          <p>{todos.filter((todo) => !todo.completed).length} items left</p>
        </div>
        <div>
          <ul className='flex justify-between flex-auto font-bold'>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                active && completed && 'text-blue-500'
              }`}
              onClick={() => {
                setActive(true);
                setCompleted(true);
              }}
            >
              All
            </li>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                active && !completed && 'text-blue-500'
              }`}
              onClick={() => {
                setActive(true);
                setCompleted(false);
              }}
            >
              Active
            </li>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                !active && completed && 'text-blue-500'
              }`}
              onClick={() => {
                setCompleted(true);
                setActive(false);
              }}
            >
              Completed
            </li>
          </ul>
        </div>
        <div>
          <div className='ml-10'>
            <button onClick={clearCompleted} className='hover:text-blue-500'>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
