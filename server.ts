// import fs from 'node:fs/promises'
// import express from 'express'
// import router from './api/index'

// const isProduction = process.env.NODE_ENV === 'production'
// const port = process.env.PORT || 5173
// const base = process.env.BASE || '/'

// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''
// const ssrManifest = isProduction
//   ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
//   : undefined

// const app = express()

// app.use("/api", router)

// let vite
// if (!isProduction) {
//   const { createServer } = await import('vite')
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base
//   })

//   app.use(vite.middlewares)
// } else {
//   const compression = (await import('compression')).default
//   const sirv = (await import('sirv')).default
//   app.use(compression())
//   app.use(base, sirv('./dist/client', { extensions: [] }))
// }

// app.use('*', async (req, res) => {
//   try {
//     const url = "/".concat(req.originalUrl.replace(base, ''))

//     let template
//     let render
//     if (!isProduction) {
//       template = await fs.readFile('./index.html', 'utf-8')
//       template = await vite.transformIndexHtml(url, template)
//       render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
//     } else {
//       template = templateHtml
//       render = (await import('./dist/server/entry-server.js')).render
//     }

//     const rendered = await render(url, ssrManifest);

//     const html = template
//       .replace(`<!--app-head-->`, rendered.head ?? '')
//       .replace(`<!--app-html-->`, rendered.html ?? '')

//     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
//   } catch (e) {
//     vite?.ssrFixStacktrace(e)
//     console.log(e.stack)
//     res.status(500).end(e.stack)
//   }
// })

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`)
// })


import express, { Express } from "express";
import fs from "fs";
import router from './api/index'

async function configProd(app: Express) {
  app.use((await import("serve-static")).default("./dist/client", { index: false }));

  // @ts-ignore
  const render = (await import("./dist/server/entry-server.js")).render;
  const bootstrap = "/assets/" + fs.readdirSync("./dist/client/assets").filter((fn: string) => fn.includes("entry-client") && fn.endsWith(".js"))[0];

  app.use("*", (req, res) => render(req, res, bootstrap));
  return app;
}

async function configDev(app: Express) {
  const cwd = process.cwd();
  const vite = await (await import("vite")).createServer({
    root: cwd,
    server: {
      middlewareMode: true,
      hmr: true,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);


  try {
    const render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    app.use("*", (req, res) => render(req, res, `/src/entry-client.tsx`));

  } catch (err) {
    const e = err as Error;
    vite.ssrFixStacktrace(e);
    console.log(e.stack);
  }


  return app;
}

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || (isProd ? 4173 : 5173);

const app = express();

app.use("/api", router)

const config = isProd ? configProd : configDev;

const configApp = await config(app)

configApp.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
