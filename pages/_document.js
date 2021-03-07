import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap'
            rel='stylesheet'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const storageKey = 'dark';
                  const classNameDark = 'dark';
                  const classNameLight = 'light';

                  let d = document.querySelector('html');
                  
                  function setClassOnDocumentBody(dark) {
                    d.classList.add(dark ? classNameDark : classNameLight);
                    d.classList.remove(dark ? classNameLight : classNameDark);
                  }
                  
                  let localStorageTheme = null;
                  
                  try {
                    localStorageTheme = localStorage.getItem(storageKey);
                  } catch (err) {}
                  
                  const localStorageExists = localStorageTheme !== null;
                  
                  if (localStorageExists) {
                    localStorageTheme = JSON.parse(localStorageTheme);
                  }
                  
                  if (localStorageExists) {
                    setClassOnDocumentBody(localStorageTheme);
                  } else {
                    let isDarkMode = d.classList.contains(classNameDark);
                    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
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
