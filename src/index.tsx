import 'assets/styles/index.css';
import App from 'components/App';
import 'configs/i18next';
import { store } from 'ducks/store';
import 'helpers/firebase.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
