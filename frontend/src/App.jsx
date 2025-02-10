import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserHome from "./pages/UserHome";
import UserPages from "./pages/UserPages";
import CaptainPages from "./pages/CaptainPages";
import CaptainHome from "./pages/CaptainHome";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/captainSignup" element={<CaptainSignup />} />
          <Route
            path="/home"
            element={
              <UserPages>
                <UserHome />
              </UserPages>
            }
          />
          <Route
            path="/captainHome"
            element={
              <CaptainPages>
                <CaptainHome />
              </CaptainPages>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
