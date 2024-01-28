import ReactDOM from "react-dom/client";
import React, { lazy } from "react";

const routes = {
    '/': lazy(() => import('./pages/Home')),
    '/1': lazy(() => import('./pages/Page1')),
    '/2': lazy(() => import('./pages/Page2')),
    '/3': lazy(() => import('./pages/Page3')),
    '*': lazy(() => import('./pages/NotFound'))
};

let url = window.location.pathname;

if (url.endsWith("/") && url.length > 1) url = url.slice(0, url.length - 1)
const Page = routes[url] || routes["*"]

// @ts-ignore
const args = window.__INITIAL_STATE__;

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <Page {...args} />
    </React.StrictMode>
)
