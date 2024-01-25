import router from "./client/router";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import type { Request, Response } from "express";
import { StrictMode } from "react";
import { URL } from "url";
import type { ReactNode } from "react";

interface HtmlProps {
  Page: (args?: object) => JSX.Element;
  head?: ReactNode;
  initState?: unknown;
}

function Html({ ...props }: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/react.svg" type="image/x-icon" />
        <link rel="stylesheet" href="/main.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props?.head ?? null}
      </head>
      <body>
        <div id="root"><props.Page {...props?.initState} /></div>
      </body>
      {!props?.initState ? null : (
        <script dangerouslySetInnerHTML=
          {{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.initState)}` }}>
        </script>
      )}
      <script type="module" dangerouslySetInnerHTML=
        {{ __html: `window.PAGE = ${props.Page}` }}
      ></script>
      <script src="/main.js" type="module"></script>
    </html>
  );
}

export default async function render(req: Request, res: Response) {
  const parsedUrl = new URL(`http://${req.headers.host}${req.originalUrl}`);
  const route = await router(parsedUrl.pathname);
  const data = route?.loader ? await route.loader(req, res) : undefined

  if (res.headersSent) return res;
  const Head = route.head;

  const html = renderToString(
    <StrictMode>
      <Html Page={route.Page} initState={data} head={Head ? <Head {...data} /> : undefined} />
    </StrictMode>
  )

  res.status(200).setHeader("content-type", "text/html").send(html)

  // const { pipe } = renderToPipeableStream(
  //   <StrictMode>
  //     <Html initState={data} head={Head ? <Head {...data} /> : undefined}>
  //       <route.Page {...data} />
  //     </Html>
  //   </StrictMode>, {
  //   onShellReady() {
  //     res.status(200).setHeader("content-type", "text/html");
  //     pipe(res);
  //   }
  // });
}
