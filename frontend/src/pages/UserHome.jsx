import React, { useContext } from "react";
import { context } from "../context/UserContext";

function UserHome() {
  const { userLogin } = useContext(context);
  return (
    <div>
      <p>welcome {userLogin?.fullName?.firstName} !!</p>
    </div>
  );
}

export default UserHome;
