import React from 'react';
import { ThemeProvider } from 'styled-components';

import Provider from './context/Provider';
import Main from './modules/Main';
import theme from './theme';

export const App = () => (
  <Provider>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </Provider>
);
