import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <>
        <App />
        <Toaster position="top-right" />
      </>
    </AuthProvider>
  </StrictMode>,
);
