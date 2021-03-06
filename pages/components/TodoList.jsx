import { useContext } from 'react';
import Moon from '../../public/icon-moon.svg';
import Sun from '../../public/icon-sun.svg';
import ThemeContext from '../../theme/ThemeContext';

const TodoList = () => {
  const { dark, toggleDark } = useContext(ThemeContext);
  return (
    <div className='flex items-center justify-between mx-auto w-80'>
      <h1 className='text-3xl font-bold leading-6 tracking-widest text-gray-100 uppercase'>
        Todo
      </h1>
      {dark ? (
        <Sun
          onClick={() => toggleDark()}
          className='w-4 h-4 text-gray-100 cursor-pointer fill-current justify-self-end'
        />
      ) : (
        <Moon
          onClick={() => toggleDark()}
          className='w-4 h-4 text-gray-100 cursor-pointer fill-current justify-self-end'
        />
      )}
    </div>
  );
};

export default TodoList;
