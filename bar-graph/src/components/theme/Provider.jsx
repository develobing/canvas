import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import './fonts.css';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export default function Provider({ children, mode = 'light' }) {
  const [localMode, setLocalMode] = useState(mode);

  const handleModeChange = (e) => {
    setLocalMode(e.matches ? 'dark' : 'light');
  };

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleModeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleModeChange);
    };
  }, []);

  return (
    <ThemeProvider theme={{ colors: theme.colors[localMode] }}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(['dark', 'light']),
};
