import Head from 'next/head';
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Todo App with Next and TailwindCSS</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main className='container mx-auto mt-12'>
        <TodoList />
      </main>
      <footer className=''></footer>
    </div>
  );
}
