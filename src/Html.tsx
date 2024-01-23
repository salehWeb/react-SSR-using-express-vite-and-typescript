import { ReactNode } from "react";
import refreshScript from "./refresh-hack.js?raw";
import sharedCssPath from "./shared.css?url"
import entryClientPath from "./entry-client.tsx?url"
import reactSvgPath from "./assets/react.svg?url"

interface HtmlProps {
  children: ReactNode;
  head?: ReactNode;
  initState?: unknown;
}

function Html({ children, ...props }: HtmlProps) {
  let viteScripts = <></>;
  if (import.meta.env.DEV) {
    viteScripts = (
      <>
        <script type="module" src="/@vite/client" />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: refreshScript }}
        />
      </>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href={reactSvgPath} type="image/x-icon" />
        <link rel="stylesheet" href={sharedCssPath} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props?.head ?? null}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
      {!props?.initState ? null : (
        <script dangerouslySetInnerHTML=
          {{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.initState)}` }}>
        </script>
      )}
      <script src={entryClientPath} type="module"></script>
      {viteScripts}
    </html>
  );
}

export default Html;

