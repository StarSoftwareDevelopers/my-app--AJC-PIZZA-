import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persist } from "./Redux/store"; //----
import { PersistGate } from "redux-persist/integration/react"; //----
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./animation.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="wrap">
          <PersistGate persistor={persist}>
            <App />
          </PersistGate>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
