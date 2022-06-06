import { ThemeProvider } from '@mui/material';
import 'assets/styles/index.css';
import App from 'components/App';
import { store } from 'ducks/store';
import 'helpers/firebase.ts';
import 'helpers/i18next';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from 'themes/default';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
