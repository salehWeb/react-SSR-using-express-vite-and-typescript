import router from "./router";
import { renderToPipeableStream } from "react-dom/server";
import type { Request, Response } from "express";
import { StrictMode } from "react";
import { URL } from "url";

interface HtmlProps {
  Page: (args?: object) => JSX.Element;
  Head?: (args?: object) => JSX.Element;
  initState?: object;
}

export function Html({ Page, Head, initState }: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/react.svg" type="image/x-icon" />
        <link rel="stylesheet" href="/main.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {Head ? <Head {...initState} /> : null}
      </head>
      <body>
        <div id="root"><Page {...initState} /></div>
      </body>
      {!initState ? null : (
        <script dangerouslySetInnerHTML=
          {{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initState)}` }}>
        </script>
      )}
      <script src="/main.js" type="module"></script>
    </html>
  );
}



export default async function render(req: Request, res: Response) {
  const parsedUrl = new URL(`http://${req.headers.host}${req.originalUrl}`);
  const route = router(parsedUrl.pathname);
  const data = route?.loader ? await route.loader(req,res) : undefined

  if (res.headersSent) return res;

  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <Html Page={route.Page} initState={data} Head={route.Head} />
    </StrictMode>, {
    onShellReady() {
      res.status(200).setHeader("content-type", "text/html");
      pipe(res);
    }
  });
}
