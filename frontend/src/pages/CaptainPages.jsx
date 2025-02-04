import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utility/axios";
import { captainDataContext } from "../context/CaptianContext";
function CaptainPages({ children }) {
  const { setCaptainLogin } = useContext(captainDataContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosInstance.get("/captain/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("captainToken"),
          },
        });

        if (res.status === 200) {
          setShow(true);
          setCaptainLogin(res.data.captain);
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

  return show ? <div>{children}</div> : <div>Unauthorized Captain</div>;
}

export default CaptainPages;
