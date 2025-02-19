import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStateProvider } from "./state/GlobalStateContext";
import { AuthProvider } from "./state/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </AuthProvider>
  </React.StrictMode>
);
