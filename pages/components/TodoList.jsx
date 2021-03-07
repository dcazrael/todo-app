import { useContext } from 'react';
import Moon from '../../public/icon-moon.svg';
import Sun from '../../public/icon-sun.svg';
import ThemeContext from '../../theme/ThemeContext';

const TodoList = () => {
  const { dark, toggleDark } = useContext(ThemeContext);

  function addTodo() {
    console.log('hello');
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
      <div className='flex items-center justify-between w-full px-6 py-2 mx-auto mt-6 bg-gray-100 rounded dark:bg-blue-800'>
        <form
          onSubmit={addTodo}
          className='flex items-center justify-center w-full text-gray-100'
        >
          <button
            type
            submit
            className='flex items-center justify-center w-5 h-5 text-gray-100 border border-gray-300 rounded-full cursor-pointer stroke-current stroke-2 dark:border-gray-600 fill-transparent hover:bg-gradient-to-br from-blue-400 to-purple-300'
          />
          <input
            type='text'
            name='new_task'
            id='new_task'
            placeholder='Create a new todo...'
            className='flex-grow p-2 mt-0.5 ml-2 text-gray-400 bg-transparent border-0 appearance-none focus:text-gray-100 focus:outline-none focus:ring focus:ring-offset-gray-500 focus:ring-opacity-30'
          />
        </form>
      </div>
    </>
  );
};

export default TodoList;
