// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Router } from "./router";

// ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
//   <BrowserRouter>
//     <Router />
//   </BrowserRouter>
// )


import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App url={window.location.pathname} />
  </React.StrictMode>
)
