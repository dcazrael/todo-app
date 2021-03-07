import Head from 'next/head';
import TodoList from './components/TodoList';
import Todos from './components/Todos';

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Todo App with Next and TailwindCSS</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <header className='bg-no-repeat bg-cover'>
        <div className='container mx-auto py-14 w-100'>
          <TodoList />
        </div>
      </header>

      <main className='container mx-auto mt-12'>
        <div className='container mx-auto -mt-20 bg-gray-100 rounded dark:bg-blue-800 w-100'>
          <Todos />
        </div>
        <div className='container mx-auto mt-12 w-100'>
          <p className='text-xs text-center text-gray-400'>
            Drag and drop to reorder list
          </p>
        </div>
      </main>
      <footer className='container py-8 mx-auto mt-6'>
        <div className='mx-auto text-center text-gray-500 w-100'>
          <p>
            Challenge by{' '}
            <a
              href='https://www.frontendmentor.io?ref=challenge'
              target='_blank'
            >
              Frontend Mentor
            </a>
            .
          </p>
          <p>
            Coded by <a href='#'>Michael Sachdev</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
