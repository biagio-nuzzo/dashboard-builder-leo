import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { generateApiClient, ApiProvider } from "@hybris-software/use-query";

const apiClient = generateApiClient({
  baseUrl: "http://localhost:8000/api/v1/",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ApiProvider apiClient={apiClient}>
    <App />
  </ApiProvider>
  // </React.StrictMode>
);
