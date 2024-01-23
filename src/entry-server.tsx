import router from "./router";
import ReactDOMServer from "react-dom/server";
import type { Request, Response } from "express";
import Html from "./Html";
import React from "react";

export async function render(req: Request, res: Response, bootstrap: string) {
  const route = await router(req.originalUrl);

  const data = route?.loader ? await route.loader(req) : undefined
  const Head = route.head;

  const { pipe } = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <Html initState={data} head={Head ? <Head {...data} /> : undefined}>
        <route.Page {...data} />
      </Html>
    </React.StrictMode>,
    {
      onShellReady() {
        res.status(200).setHeader("content-type", "text/html");
        pipe(res);
      },
      bootstrapModules: [bootstrap]
    }
  );
}
