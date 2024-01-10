import React, { ReactElement }  from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { HeadContext } from "./HeadContext";


const FullApp = () => {
  const headContext: { head?: ReactElement } = {};

  return (
    <React.StrictMode>
      <BrowserRouter>
        <HeadContext.Provider value={headContext}>
          <App />
        </HeadContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}


ReactDOM.hydrateRoot(document.getElementById("root")!, <FullApp /> );
