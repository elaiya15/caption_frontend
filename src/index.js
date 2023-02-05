import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
// import {Table } from "./components/table/Table.jsx";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
      

    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
