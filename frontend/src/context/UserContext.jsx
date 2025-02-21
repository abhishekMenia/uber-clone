import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utility/axios";

export const context = createContext();

function UserContext({ children }) {
  const [userLogin, setUserLogin] = useState({});
  const [userToken, setUserToken] = useState();
  // const [show, setShow] = useState(false);

  useEffect(() => {
    if (userToken) {
      // localStorage.clear();
      localStorage.setItem("userToken", userToken);
      console.log(userToken);
    }
  }, [userToken]);

  return (
    <context.Provider
      value={{ userLogin, setUserLogin, userToken, setUserToken }}
    >
      {children}
    </context.Provider>
  );
}

export default UserContext;
