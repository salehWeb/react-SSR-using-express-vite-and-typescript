import express from "express";
import router from './api/index'
import compression from 'compression'
import sirv from 'sirv'
import render from './entry-server.tsx'

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || (isProd ? 4173 : 5173);

const app = express();

app.use("/api", router)

app.use(compression())

app.use("/", sirv('./build/client', { extensions: [], setHeaders: (res) => res.setHeader("Cache-Control", " max-age=31536000, immutable") }))

app.use("*", (req, res) => render(req, res));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
