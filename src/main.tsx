import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import config from "./config/config";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider
        options={{
          clientId: config.paypal.clientId,
          currency: config.paypal.currency,
        }}
      >
        <GoogleOAuthProvider clientId={config.google.clientId}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PayPalScriptProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
