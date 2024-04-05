import {renderToString} from "react-dom/server"
import {StaticRouter} from "react-router-dom/server"
import App from "./App"
import { HelmetProvider } from 'react-helmet-async';

export const render = ({ path, data, fullUrl }) => {
  const helmetContext = {};
  const html = renderToString(
    <StaticRouter location={path}>
      <HelmetProvider context={helmetContext}>
        <App data={data} fullUrl={fullUrl}/>
      </HelmetProvider>
    </StaticRouter>
  );

  const { helmet } = helmetContext;
  return { html, helmet };
}