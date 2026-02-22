//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
//import { Toaster } from "react-hot-toast";

import ReactDOM from "react-dom/client";
import React from "react";

import { ActivityProvider } from "./context/ActivityContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ActivityProvider>
        <App />
      </ActivityProvider>
    </AuthProvider>
  </React.StrictMode>,
);
