import router from "./router";
import { renderToPipeableStream } from "react-dom/server";
import type { Request, Response } from "express";
import Html from "./Html";
import { StrictMode } from "react";
import { URL } from "url";

export async function render(req: Request, res: Response) {
  const parsedUrl = new URL(`http://${req.headers.host}${req.originalUrl}`);
  const route = await router(parsedUrl.pathname);
  const data = route?.loader ? await route.loader(req, res) : undefined

  if (res.headersSent) return res;
  const Head = route.head;

  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <Html initState={data} head={Head ? <Head {...data} /> : undefined}>
        <route.Page {...data} />
      </Html>
    </StrictMode>, {
    onShellReady() {
      res.status(200).setHeader("content-type", "text/html");
      pipe(res);
    }
  });
}
