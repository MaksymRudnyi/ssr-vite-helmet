import {hydrateRoot} from "react-dom/client"
import {BrowserRouter} from "react-router-dom"
import App from "./App"
import { HelmetProvider } from 'react-helmet-async';

const ssrdata = window.__SSR_DATA__
delete window.__SSR_DATA__

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <HelmetProvider>
      <App data={ssrdata.data} fullUrl={ssrdata.data.fullUrl} />
    </HelmetProvider>
  </BrowserRouter>
)

