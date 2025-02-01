import React, { createContext, useState } from "react";

export const context = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    email: "email@email.com",
  });

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
}

export default UserContext;
