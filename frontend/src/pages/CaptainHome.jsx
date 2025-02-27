import React, { useContext, useEffect, useRef, useState } from "react";
import { captainDataContext } from "../context/CaptianContext";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AcceptRide from "../components/AcceptRide";
import { socketContextData } from "../context/SocketContext";
import { axiosInstance } from "../../utility/axios";
import LiveTracking from "../components/LiveTracking";

function CaptainHome() {
  const { captainLogin } = useContext(captainDataContext);
  const { socket, sendMessage } = useContext(socketContextData);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [acceptRidePanel, setAcceptRidePanel] = useState(false);
  const [passenger, setPassenger] = useState({});

  const ridePopUpPanelRef = useRef(null);
  const acceptRidePanelRef = useRef(null);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captainLogin._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(location);
          socket.emit("updateCaptainLocation", {
            userId: captainLogin._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(() => {
      updateLocation();
    }, 10000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, []);

  socket.on("newRide", (data) => {
    console.log("ride Data: ", data);
    setPassenger(data);
    setRidePopUpPanel(true);
  });

  socket.on("rideCancelled", (data) => {
    console.log("ride cancelled :", data);
    setRidePopUpPanel(false);
    setAcceptRidePanel(false);
  });

  const confirmRide = async (id) => {
    const payload = {
      rideId: id,
    };
    try {
      const res = await axiosInstance.patch("/ride/confirm", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("captainToken"),
        },
      });
      // console.log(res);
      if (res.status === 200) {
        setAcceptRidePanel(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        translateY: "100%",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (acceptRidePanel) {
      gsap.to(acceptRidePanelRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(acceptRidePanelRef.current, {
        translateY: "100%",
      });
    }
  }, [acceptRidePanel]);

  return (
    <div className="h-screen ">
      <div className="w-full px-2 flex justify-between items-center absolute">
        <img
          className="w-20  rounded-md"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="error loading"
        />
        <Link
          to={"/captainLogin"}
          className="  bg-white p-2 rounded-full cursor-pointer"
          onClick={() => localStorage.clear()}
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </Link>
      </div>

      <div className="h-[60%]">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="err"
        /> */}
        <LiveTracking />
      </div>
      <div className="h-[40%]  p-2">
        <CaptainDetails captainLogin={captainLogin} />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="bottom-0 fixed z-60 w-full bg-white "
      >
        <RidePopUp
          passenger={passenger}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptRidePanel={setAcceptRidePanel}
        />
      </div>
      <div
        ref={acceptRidePanelRef}
        className="bottom-0 fixed h-screen z-60 w-full bg-white "
      >
        <AcceptRide
          passenger={passenger}
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptRidePanel={setAcceptRidePanel}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
