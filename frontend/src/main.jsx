import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import CaptianContext from "./context/CaptianContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptianContext>
      <UserContext>
        <App />
      </UserContext>
    </CaptianContext>
  </StrictMode>
);
