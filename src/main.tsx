import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/experience.css";
import "./styles/projects.css";
import "./styles/cursor.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
