import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap'
            rel='stylesheet'
          />

          <meta charset='UTF-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const storageKey = 'dark';
                  const [dark, light] = ['dark', 'light'];

                  let d = document.querySelector('html');
                  let localStorageTheme = JSON.parse(localStorage.getItem(storageKey));
                  
                  if (localStorageTheme === null) {
                    const prefersDarkMode = matchMedia('(prefers-color-scheme: dark)').matches
                    localStorage.setItem(storageKey, JSON.stringify(prefersDarkMode))
                    localStorageTheme = prefersDarkMode
                  }
                  
                  setClassOnDocumentBody(localStorageTheme);
                  
                  function setClassOnDocumentBody(darkMode) {
                    d.classList.remove(darkMode ? light : dark);
                    d.classList.add(darkMode ? dark : light);
                  }
                })();
              `,
            }}
          />
        </Head>
        <body className='bg-gray-200 dark:bg-blue-900 font-josefin'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
