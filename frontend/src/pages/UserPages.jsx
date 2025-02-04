import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utility/axios";
import { context } from "../context/UserContext";

function UserPages({ children }) {
  const { setUserLogin } = useContext(context);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosInstance.get("/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        });

        if (res.status === 200) {
          setShow(true);
          setUserLogin(res.data.user);
        } else {
          setShow(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setShow(false);
      }
    };

    getProfile();
  }, []);

  return show ? <div>{children}</div> : <div>Unauthorized User</div>;
}

export default UserPages;
