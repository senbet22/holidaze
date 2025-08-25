import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeProvider.jsx";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DarkModeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DarkModeProvider>
  </BrowserRouter>
);
