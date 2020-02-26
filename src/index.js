import React from "react";
import { render } from "react-dom";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { initializeApp } from "./firebase";
import "./index.css";

if (process.env.REACT_APP_USE_FIREBASE) {
  initializeApp();
}

render(<App />, document.getElementById("root"));

serviceWorker.register();
