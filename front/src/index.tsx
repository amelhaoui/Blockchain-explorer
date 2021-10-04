import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import client from "app/graphQL/Client";
import App from "app/App";
import theme from "theme";

import "./index.css";


Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);