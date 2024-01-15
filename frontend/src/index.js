import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CeramicsContextProvider } from "./context/CeramicsContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CeramicsContextProvider>
        <App />
      </CeramicsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
