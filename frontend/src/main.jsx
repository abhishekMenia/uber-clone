import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import CaptianContext from "./context/CaptianContext.jsx";
import SocketContext from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptianContext>
      <UserContext>
        <SocketContext>
          <App />
        </SocketContext>
      </UserContext>
    </CaptianContext>
  </StrictMode>
);
