import React, { createContext, useEffect, useState } from "react";

export const captainDataContext = createContext();

function CaptianContext({ children }) {
  const [captainLogin, setCaptainLogin] = useState({});
  const [captainToken, setCaptainToken] = useState();
  // const [rideDetails, setRideDetails] = useState({});

  useEffect(() => {
    if (captainToken) {
      // localStorage.clear();
      localStorage.setItem("captainToken", captainToken);
    }
  }, [captainToken]);
  useEffect(() => {
    console.log("123:", captainLogin);
  }, [captainLogin]);

  return (
    <captainDataContext.Provider
      value={{
        captainLogin,
        setCaptainLogin,
        captainToken,
        setCaptainToken,
        // setRideDetails,
        // rideDetails,
      }}
    >
      {children}
    </captainDataContext.Provider>
  );
}

export default CaptianContext;
