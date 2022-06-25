import { ThemeProvider } from '@mui/material';
import 'assets/styles/index.css';
import App from 'components/App';
import 'configs/firebase.ts';
import 'configs/i18next';
import { store } from 'ducks/store';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
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
        <DndProvider options={HTML5toTouch}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
