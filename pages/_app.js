import { ThemeProvider } from '../pages/context/ThemeContext';
import { TodoProvider } from '../pages/context/TodoContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default MyApp;
