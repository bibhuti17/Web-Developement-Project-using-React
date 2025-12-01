import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export async function render(url) {
  const helmetContext = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const appHtml = renderToString(app);
  const { helmet } = helmetContext;

  return {
    appHtml,
    helmetTitle: helmet.title.toString(),
    helmetMeta: helmet.meta.toString(),
  };
}
