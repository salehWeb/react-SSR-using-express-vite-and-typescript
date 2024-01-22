// import ReactDOMServer from 'react-dom/server'
// import { StaticRouter } from "react-router-dom/server";
// import { Router } from "./router";

// export async function render(url: string) {
//   const html = ReactDOMServer.renderToString(
//     <StaticRouter location={url}>
//       <Router />
//     </StaticRouter>
//   )

//   return { html }
// }


import ReactDOMServer from "react-dom/server";
import type { Request, Response } from "express";
import App from "./App";
import Html from "./Html";

export function render(req: Request, res: Response, bootstrap: string) {
  const { pipe } = ReactDOMServer.renderToPipeableStream(
    <Html>
      <App url={req.originalUrl}/>
    </Html>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        pipe(res);
      },
      bootstrapModules: [bootstrap],
    }
  );
}
