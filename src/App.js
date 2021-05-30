import React from 'react';
import { ThemeProvider } from 'styled-components';

import Provider from './context/Provider';
import Home from './modules/Main';
import theme from './theme';

export const App = () => (
  <Provider>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </Provider>
);
