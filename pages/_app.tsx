/* eslint-disable react/prop-types */
// pages/_app.js
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from '@interchain-ui/react';
import { useTheme } from '../hooks/useTheme';
import '@interchain-ui/react/styles';

const styles = {
  global: (props) => ({
    // styles for the `body`
    body: {
      background:
        props.colorMode === 'dark'
          ? 'no-repeat center linear-gradient(112.1deg,  rgba(29,23,38,0.95) 11.4%, rgba(65,48,87,0.95) 70.2%)'
          : 'white',
    },
  }),
};

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({ colors, styles });

function CosmologyApp({ Component, pageProps }) {
  const { themeClass } = useTheme();
  return (
    <ChakraProvider theme={theme} cssVarsRoot='body'>
      <ThemeProvider defaultTheme='dark'>
        <div className={themeClass}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default CosmologyApp;
