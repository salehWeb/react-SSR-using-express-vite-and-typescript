import React from "react";

export const App = ({ Outlet, Head }: { Outlet?: JSX.Element, Head?: JSX.Element }) => {
  return (
    <React.StrictMode>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {Head}
        </head>
        <body>
          {Outlet}
        </body>
      </html>
    </React.StrictMode>
  );
};

