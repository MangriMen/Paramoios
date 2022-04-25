import React from "react";
import ReactDOM from "react-dom/client";
import "assets/styles/index.css";
import App from "components/App";
import "helpers/i18next";
import { Provider } from "react-redux";
import { store } from "ducks/store";
import "helpers/firebase.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
