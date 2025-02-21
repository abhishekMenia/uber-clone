import React, { useContext, useRef, useState } from "react";
import { captainDataContext } from "../context/CaptianContext";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AcceptRide from "../components/AcceptRide";

function CaptainHome() {
  const { captainLogin } = useContext(captainDataContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [acceptRidePanel, setAcceptRidePanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const acceptRidePanelRef = useRef(null);

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
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </Link>
      </div>

      <div className="h-[60%]">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="err"
        />
      </div>
      <div className="h-[40%]  p-2">
        <CaptainDetails captainLogin={captainLogin} />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="bottom-0 fixed z-10 w-full bg-white "
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptRidePanel={setAcceptRidePanel}
        />
      </div>
      <div
        ref={acceptRidePanelRef}
        className="bottom-0 fixed h-screen z-10 w-full bg-white "
      >
        <AcceptRide
          setRidePopUpPanel={setRidePopUpPanel}
          setAcceptRidePanel={setAcceptRidePanel}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
