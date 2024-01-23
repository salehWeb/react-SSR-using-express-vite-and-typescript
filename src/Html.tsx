import { ReactNode } from "react";
import refreshScript from "./refresh-hack.js?raw";

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
        <link rel="shortcut icon" href="/src/assets/react.svg" type="image/x-icon" />
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
      {viteScripts}
    </html>
  );
}

export default Html;
