var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// dist/server/assets/Home-ImON3BiA.js
var Home_ImON3BiA_exports = {};
__export(Home_ImON3BiA_exports, {
  default: () => Home
});
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
var reactLogo, Home;
var init_Home_ImON3BiA = __esm({
  "dist/server/assets/Home-ImON3BiA.js"() {
    "use strict";
    reactLogo = "/assets/react-h3aPdYU7.svg";
    Home = () => {
      const [count, setCount] = useState(0);
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("a", { href: "https://vitejs.dev", target: "_blank", children: /* @__PURE__ */ jsx("img", { src: "/vite.svg", className: "logo", alt: "Vite logo" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://reactjs.org", target: "_blank", children: /* @__PURE__ */ jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })
        ] }),
        /* @__PURE__ */ jsx("h1", { children: "Vite + React" }),
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

// dist/server/assets/Page1-7K_oiwlO.js
var Page1_7K_oiwlO_exports = {};
__export(Page1_7K_oiwlO_exports, {
  default: () => Page1
});
import { jsx as jsx2 } from "react/jsx-runtime";
var Page1;
var init_Page1_7K_oiwlO = __esm({
  "dist/server/assets/Page1-7K_oiwlO.js"() {
    "use strict";
    Page1 = () => {
      return /* @__PURE__ */ jsx2("div", { children: "Page1" });
    };
  }
});

// dist/server/assets/Page2-_3hlNTw3.js
var Page2_3hlNTw3_exports = {};
__export(Page2_3hlNTw3_exports, {
  default: () => Page2
});
import { jsx as jsx3 } from "react/jsx-runtime";
var Page2;
var init_Page2_3hlNTw3 = __esm({
  "dist/server/assets/Page2-_3hlNTw3.js"() {
    "use strict";
    Page2 = () => {
      return /* @__PURE__ */ jsx3("div", { children: "Page2" });
    };
  }
});

// dist/server/assets/Page3-KYPgvVOq.js
var Page3_KYPgvVOq_exports = {};
__export(Page3_KYPgvVOq_exports, {
  default: () => Page3
});
import { jsx as jsx4 } from "react/jsx-runtime";
var Page3;
var init_Page3_KYPgvVOq = __esm({
  "dist/server/assets/Page3-KYPgvVOq.js"() {
    "use strict";
    Page3 = () => {
      return /* @__PURE__ */ jsx4("div", { children: "Page3" });
    };
  }
});

// dist/server/assets/NotFound-FMhcqQLp.js
var NotFound_FMhcqQLp_exports = {};
__export(NotFound_FMhcqQLp_exports, {
  default: () => NotFound
});
import { jsx as jsx5 } from "react/jsx-runtime";
var NotFound;
var init_NotFound_FMhcqQLp = __esm({
  "dist/server/assets/NotFound-FMhcqQLp.js"() {
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
import { StaticRouter } from "react-router-dom/server.mjs";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2e3);
  }).then(() => promise);
}
function Html({ children }) {
  let viteScripts = /* @__PURE__ */ jsx6(Fragment2, {});
  return /* @__PURE__ */ jsxs2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx6("meta", { charSet: "UTF-8" }),
      viteScripts,
      /* @__PURE__ */ jsx6("link", { rel: "shortcut icon", href: "/feld.svg", type: "image/x-icon" }),
      /* @__PURE__ */ jsx6("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx6("title", { children: "FELD" })
    ] }),
    /* @__PURE__ */ jsx6("body", { children: /* @__PURE__ */ jsx6("div", { id: "root", children }) })
  ] });
}
function render(req, res, bootstrap) {
  const { pipe } = ReactDOMServer.renderToPipeableStream(
    /* @__PURE__ */ jsx6(Html, { children: /* @__PURE__ */ jsx6(StaticRouter, { location: req.originalUrl, children: /* @__PURE__ */ jsx6(Router, {}) }) }),
    {
      onShellReady() {
        res.status(200).setHeader("content-type", "text/html");
        pipe(res);
      },
      bootstrapModules: [bootstrap]
    }
  );
}
var Home2, Page12, Page22, Page32, NotFound2, Router;
var init_entry_server = __esm({
  "dist/server/entry-server.js"() {
    "use strict";
    Home2 = lazy(() => delayForDemo(Promise.resolve().then(() => (init_Home_ImON3BiA(), Home_ImON3BiA_exports))));
    Page12 = lazy(() => Promise.resolve().then(() => (init_Page1_7K_oiwlO(), Page1_7K_oiwlO_exports)));
    Page22 = lazy(() => Promise.resolve().then(() => (init_Page2_3hlNTw3(), Page2_3hlNTw3_exports)));
    Page32 = lazy(() => Promise.resolve().then(() => (init_Page3_KYPgvVOq(), Page3_KYPgvVOq_exports)));
    NotFound2 = lazy(() => Promise.resolve().then(() => (init_NotFound_FMhcqQLp(), NotFound_FMhcqQLp_exports)));
    Router = () => {
      return /* @__PURE__ */ jsxs2(Routes, { children: [
        /* @__PURE__ */ jsx6(Route, { index: true, element: /* @__PURE__ */ jsx6(Suspense, { fallback: /* @__PURE__ */ jsx6("h1", { children: "loading..." }), children: /* @__PURE__ */ jsx6(Home2, {}) }) }),
        /* @__PURE__ */ jsx6(Route, { path: "/1", element: /* @__PURE__ */ jsx6(Suspense, { fallback: /* @__PURE__ */ jsx6("h1", { children: "loading..." }), children: /* @__PURE__ */ jsx6(Page12, {}) }) }),
        /* @__PURE__ */ jsx6(Route, { path: "/2", element: /* @__PURE__ */ jsx6(Suspense, { fallback: /* @__PURE__ */ jsx6("h1", { children: "loading..." }), children: /* @__PURE__ */ jsx6(Page22, {}) }) }),
        /* @__PURE__ */ jsx6(Route, { path: "/3", element: /* @__PURE__ */ jsx6(Suspense, { fallback: /* @__PURE__ */ jsx6("h1", { children: "loading..." }), children: /* @__PURE__ */ jsx6(Page32, {}) }) }),
        /* @__PURE__ */ jsx6(Route, { path: "*", element: /* @__PURE__ */ jsx6(Suspense, { fallback: /* @__PURE__ */ jsx6("h1", { children: "loading..." }), children: /* @__PURE__ */ jsx6(NotFound2, {}) }) })
      ] });
    };
  }
});

// server.ts
import express2 from "express";
import fs from "fs";

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
  app2.use((await import("serve-static")).default("./dist/client", { index: false }));
  const render2 = (await Promise.resolve().then(() => (init_entry_server(), entry_server_exports))).render;
  const bootstrap = "/assets/" + fs.readdirSync("./dist/client/assets").filter((fn) => fn.includes("entry-client") && fn.endsWith(".js"))[0];
  app2.use("*", (req, res) => render2(req, res, bootstrap));
  return app2;
}
async function configDev(app2) {
  const cwd = process.cwd();
  const vite = await (await import("vite")).createServer({
    root: cwd,
    server: {
      middlewareMode: true,
      hmr: true
    },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  try {
    const render2 = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    app2.use("*", (req, res) => render2(req, res, `/src/entry-client.tsx`));
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
