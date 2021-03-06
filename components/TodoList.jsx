import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import TodoContext from '../context/TodoContext';
import Moon from '../public/icon-moon.svg';
import Sun from '../public/icon-sun.svg';

const TodoList = () => {
  const { dark, toggleDark } = useContext(ThemeContext);
  const { todos, addTodos } = useContext(TodoContext);

  function addTodo(e) {
    e.preventDefault();

    let id = 1;

    if (todos) {
      todos.map((todo) => {
        if (todo.id >= id) {
          id = todo.id + 1;
        }
      });
    }
    addTodos({ id: id, text: e.target[1].value, completed: false });
    e.target.reset();
  }
  return (
    <>
      <div className='flex items-center justify-between w-full mx-auto'>
        <h1 className='text-4xl font-bold leading-6 tracking-widest text-gray-100 uppercase'>
          Todo
        </h1>
        {dark ? (
          <Sun
            onClick={() => toggleDark()}
            className='w-5 h-5 text-gray-100 cursor-pointer fill-current justify-self-end'
          />
        ) : (
          <Moon
            onClick={() => toggleDark()}
            className='w-5 h-5 text-gray-100 cursor-pointer fill-current justify-self-end'
          />
        )}
      </div>
      <div className='flex items-center justify-between w-full px-6 py-2 mx-auto mt-6 text-xl bg-gray-100 rounded md:text-base dark:bg-blue-800'>
        <form
          onSubmit={addTodo}
          className='flex items-center justify-center w-full text-gray-100'
        >
          <button
            type='submit'
            className='flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full cursor-pointer stroke-current stroke-2 md:w-5 md:h-5 dark:border-gray-600 fill-transparent hover:bg-gradient-to-br from-blue-400 to-purple-300'
          >
            +
          </button>
          <input
            type='text'
            name='new_task'
            id='new_task'
            aria-label='Create new todo'
            placeholder='Create a new todo...'
            className='flex-grow px-2 pt-2.5 pb-1.5 mt-0 ml-2 text-gray-400 bg-transparent border-0 appearance-none md:p-2 no-autofill-bg focus:dark:text-gray-100 focus:outline-none focus:ring focus:ring-opacity-30'
          />
        </form>
      </div>
    </>
  );
};

export default TodoList;
