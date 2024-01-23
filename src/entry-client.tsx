import ReactDOM from "react-dom/client";
import React from "react";
import router from "./router";

const route = await router(window.location.pathname);
// @ts-ignore
const args = window.__INITIAL_STATE__;

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <route.Page {...args}/>
  </React.StrictMode>
)
