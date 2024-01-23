var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// dist/server/Home.js
var Home_exports = {};
__export(Home_exports, {
  default: () => Home,
  head: () => head,
  loader: () => loader
});
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
var reactLogo, loader, head, Home;
var init_Home = __esm({
  "dist/server/Home.js"() {
    "use strict";
    reactLogo = "/react.svg";
    loader = async (req, res) => {
      var _a;
      if (((_a = req.query) == null ? void 0 : _a.name) === "salih") {
        res.redirect("/1");
      }
      return { data: { name: "sailh home page", content: req.get("content-type") } };
    };
    head = (args) => {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("title", { children: "home head" }),
        /* @__PURE__ */ jsx("meta", { rel: "description", content: args.data.name })
      ] });
    };
    Home = (props) => {
      const [count, setCount] = useState(0);
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("a", { href: "https://vitejs.dev", target: "_blank", children: /* @__PURE__ */ jsx("img", { src: "/vite.svg", className: "logo", alt: "Vite logo" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://reactjs.org", target: "_blank", children: /* @__PURE__ */ jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })
        ] }),
        /* @__PURE__ */ jsx("h1", { children: "Vite + React" }),
        /* @__PURE__ */ jsx("h1", { children: props.data.name }),
        /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setCount((count2) => count2 + 1), children: [
            "count is ",
            count
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Edit ",
            /* @__PURE__ */ jsx("code", { children: "src/pages/Home.tsx" }),
            " and save to test HMR"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })
      ] });
    };
  }
});

// dist/server/Page1.js
var Page1_exports = {};
__export(Page1_exports, {
  default: () => Page1
});
import { jsx as jsx2 } from "react/jsx-runtime";
var Page1;
var init_Page1 = __esm({
  "dist/server/Page1.js"() {
    "use strict";
    Page1 = () => {
      return /* @__PURE__ */ jsx2("div", { children: "Page1" });
    };
  }
});

// dist/server/Page2.js
var Page2_exports = {};
__export(Page2_exports, {
  default: () => Page2
});
import { jsx as jsx3 } from "react/jsx-runtime";
var Page2;
var init_Page2 = __esm({
  "dist/server/Page2.js"() {
    "use strict";
    Page2 = () => {
      return /* @__PURE__ */ jsx3("div", { children: "Page2" });
    };
  }
});

// dist/server/Page3.js
var Page3_exports = {};
__export(Page3_exports, {
  default: () => Page3
});
import { jsx as jsx4 } from "react/jsx-runtime";
var Page3;
var init_Page3 = __esm({
  "dist/server/Page3.js"() {
    "use strict";
    Page3 = () => {
      return /* @__PURE__ */ jsx4("div", { children: "Page3" });
    };
  }
});

// dist/server/NotFound.js
var NotFound_exports = {};
__export(NotFound_exports, {
  default: () => NotFound
});
import { jsx as jsx5 } from "react/jsx-runtime";
var NotFound;
var init_NotFound = __esm({
  "dist/server/NotFound.js"() {
    "use strict";
    NotFound = () => {
      return /* @__PURE__ */ jsx5("div", { children: "NotFound" });
    };
  }
});

// dist/server/entry-server.js
var entry_server_exports = {};
__export(entry_server_exports, {
  render: () => render
});
import { jsxs as jsxs2, jsx as jsx6, Fragment as Fragment2 } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { StrictMode } from "react";
import { URL } from "url";
function Html({ children, ...props }) {
  let viteScripts = /* @__PURE__ */ jsx6(Fragment2, {});
  return /* @__PURE__ */ jsxs2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx6("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx6("link", { rel: "shortcut icon", href: reactSvgPath, type: "image/x-icon" }),
      /* @__PURE__ */ jsx6("link", { rel: "stylesheet", href: sharedCssPath }),
      /* @__PURE__ */ jsx6("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      (props == null ? void 0 : props.head) ?? null
    ] }),
    /* @__PURE__ */ jsx6("body", { children: /* @__PURE__ */ jsx6("div", { id: "root", children }) }),
    !(props == null ? void 0 : props.initState) ? null : /* @__PURE__ */ jsx6("script", { dangerouslySetInnerHTML: { __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.initState)}` } }),
    /* @__PURE__ */ jsx6("script", { src: entryClientPath, type: "module" }),
    viteScripts
  ] });
}
async function render(req, res) {
  const parsedUrl = new URL(`http://${req.headers.host}${req.originalUrl}`);
  const route = await router(parsedUrl.pathname);
  const data2 = (route == null ? void 0 : route.loader) ? await route.loader(req, res) : void 0;
  if (res.headersSent)
    return res;
  const Head = route.head;
  const { pipe } = renderToPipeableStream(
    /* @__PURE__ */ jsx6(StrictMode, { children: /* @__PURE__ */ jsx6(Html, { initState: data2, head: Head ? /* @__PURE__ */ jsx6(Head, { ...data2 }) : void 0, children: /* @__PURE__ */ jsx6(route.Page, { ...data2 }) }) }),
    {
      onShellReady() {
        res.status(200).setHeader("content-type", "text/html");
        pipe(res);
      }
    }
  );
}
var routes, router, sharedCssPath, entryClientPath, reactSvgPath;
var init_entry_server = __esm({
  "dist/server/entry-server.js"() {
    "use strict";
    routes = {
      "/": () => Promise.resolve().then(() => (init_Home(), Home_exports)),
      "/1": () => Promise.resolve().then(() => (init_Page1(), Page1_exports)),
      "/2": () => Promise.resolve().then(() => (init_Page2(), Page2_exports)),
      "/3": () => Promise.resolve().then(() => (init_Page3(), Page3_exports))
    };
    router = async (url) => {
      if (url.endsWith("/") && url.length > 1)
        url = url.slice(0, url.length - 1);
      const importRoute = routes[url] || (() => Promise.resolve().then(() => (init_NotFound(), NotFound_exports)));
      const route = await importRoute();
      return {
        Page: route.default,
        loader: route == null ? void 0 : route.loader,
        head: route == null ? void 0 : route.head
      };
    };
    sharedCssPath = "data:text/css;base64,OnJvb3QgewogIGZvbnQtZmFtaWx5OiBJbnRlciwgc3lzdGVtLXVpLCBBdmVuaXIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7CiAgbGluZS1oZWlnaHQ6IDEuNTsKICBmb250LXdlaWdodDogNDAwOwoKICBjb2xvci1zY2hlbWU6IGxpZ2h0IGRhcms7CiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44Nyk7CiAgYmFja2dyb3VuZC1jb2xvcjogIzI0MjQyNDsKCiAgZm9udC1zeW50aGVzaXM6IG5vbmU7CiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsKICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDsKICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsKfQoKYSB7CiAgZm9udC13ZWlnaHQ6IDUwMDsKICBjb2xvcjogIzY0NmNmZjsKICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7Cn0KYTpob3ZlciB7CiAgY29sb3I6ICM1MzViZjI7Cn0KCmJvZHkgewogIG1hcmdpbjogMDsKICBkaXNwbGF5OiBmbGV4OwogIHBsYWNlLWl0ZW1zOiBjZW50ZXI7CiAgbWluLXdpZHRoOiAzMjBweDsKICBtaW4taGVpZ2h0OiAxMDB2aDsKfQoKaDEgewogIGZvbnQtc2l6ZTogMy4yZW07CiAgbGluZS1oZWlnaHQ6IDEuMTsKfQoKYnV0dG9uIHsKICBib3JkZXItcmFkaXVzOiA4cHg7CiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7CiAgcGFkZGluZzogMC42ZW0gMS4yZW07CiAgZm9udC1zaXplOiAxZW07CiAgZm9udC13ZWlnaHQ6IDUwMDsKICBmb250LWZhbWlseTogaW5oZXJpdDsKICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhOwogIGN1cnNvcjogcG9pbnRlcjsKICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4yNXM7Cn0KYnV0dG9uOmhvdmVyIHsKICBib3JkZXItY29sb3I6ICM2NDZjZmY7Cn0KYnV0dG9uOmZvY3VzLApidXR0b246Zm9jdXMtdmlzaWJsZSB7CiAgb3V0bGluZTogNHB4IGF1dG8gLXdlYmtpdC1mb2N1cy1yaW5nLWNvbG9yOwp9CgpAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkgewogIDpyb290IHsKICAgIGNvbG9yOiAjMjEzNTQ3OwogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsKICB9CiAgYTpob3ZlciB7CiAgICBjb2xvcjogIzc0N2JmZjsKICB9CiAgYnV0dG9uIHsKICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7CiAgfQp9Cg==";
    entryClientPath = "data:application/octet-stream;base64,aW1wb3J0IFJlYWN0RE9NIGZyb20gInJlYWN0LWRvbS9jbGllbnQiOwppbXBvcnQgUmVhY3QgZnJvbSAicmVhY3QiOwppbXBvcnQgcm91dGVyIGZyb20gIi4vcm91dGVyIjsKCnJvdXRlcih3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpLnRoZW4ocm91dGUgPT4gewogIC8vIEB0cy1pZ25vcmUKICBjb25zdCBhcmdzID0gd2luZG93Ll9fSU5JVElBTF9TVEFURV9fOwoKICBSZWFjdERPTS5oeWRyYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpIGFzIEhUTUxFbGVtZW50LAogICAgPFJlYWN0LlN0cmljdE1vZGU+CiAgICAgIDxyb3V0ZS5QYWdlIHsuLi5hcmdzfSAvPgogICAgPC9SZWFjdC5TdHJpY3RNb2RlPgogICkKfSk7Cg==";
    reactSvgPath = "/react.svg";
  }
});

// server.ts
import express2 from "express";

// api/index.ts
import express from "express";
var api = express.Router();
var data = {
  name: "salih",
  phone: 2180924685343
};
api.get("/", (req, res) => {
  return res.json({ massage: "hello from test", data }).status(200);
});
var api_default = api;

// server.ts
async function configProd(app2) {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app2.use(compression());
  app2.use("/", sirv("./dist/server/client", { extensions: [] }));
  const render2 = (await Promise.resolve().then(() => (init_entry_server(), entry_server_exports))).render;
  app2.use("*", (req, res) => render2(req, res));
  return app2;
}
async function configDev(app2) {
  const vite = await (await import("vite")).createServer({
    root: process.cwd(),
    server: { middlewareMode: true, hmr: true },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  try {
    const render2 = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    app2.use("*", (req, res) => render2(req, res));
  } catch (err) {
    const e = err;
    vite.ssrFixStacktrace(e);
    console.log(e.stack);
  }
  return app2;
}
var isProd = process.env.NODE_ENV === "production";
var port = process.env.PORT || (isProd ? 4173 : 5173);
var app = express2();
app.use("/api", api_default);
var config = isProd ? configProd : configDev;
var configApp = await config(app);
configApp.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
