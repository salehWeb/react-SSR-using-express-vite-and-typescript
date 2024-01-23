import express, { Express } from "express";
import router from './api/index'

async function configProd(app: Express) {
  const compression = (await import('compression')).default

  const sirv = (await import('sirv')).default

  app.use(compression())

  app.use("/", sirv('./dist/server/client', { extensions: [] }))

  // @ts-ignore
  const render = (await import("./dist/server/entry-server.js")).render;

  app.use("*", (req, res) => render(req, res));

  return app;
}

async function configDev(app: Express) {
  const vite = await (await import("vite")).createServer({
    root: process.cwd(),
    server: { middlewareMode: true, hmr: true },
    appType: "custom"
  });

  app.use(vite.middlewares);

  try {
    const render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    app.use("*", (req, res) => render(req, res));
  } catch (err) {
    const e = err as Error;
    vite.ssrFixStacktrace(e);
    console.log(e.stack);
  }

  return app;
}

// working on the build and clean up files and unused files

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || (isProd ? 4173 : 5173);

const app = express();

app.use("/api", router)

const config = isProd ? configProd : configDev;

const configApp = await config(app)

configApp.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
