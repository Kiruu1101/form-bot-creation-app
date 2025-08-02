import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store";
import { setUser } from "./redux/authSlice";

const authData = localStorage.getItem("auth");
if (authData) {
  const parsed = JSON.parse(authData);
  store.dispatch(setUser(parsed));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>
);
