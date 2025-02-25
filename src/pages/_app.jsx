import { useEffect } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalStyles';
import theme from '../styles/theme';
import Header from '@/component/Header';
import Main from '@/container/Main';

const App = () => {
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();

    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Main />
    </ThemeProvider>
  );
};

export default App;
