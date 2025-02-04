import React, { useContext } from "react";
import { captainDataContext } from "../context/CaptianContext";

function CaptainHome() {
  const { captainLogin } = useContext(captainDataContext);
  //   console.warn(captainLogin);

  return (
    <div>
      <p>welcome {captainLogin?.fullName?.firstName} !!</p>
    </div>
  );
}

export default CaptainHome;
