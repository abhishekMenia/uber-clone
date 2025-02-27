import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "./FinishRide";
import LiveTracking from "./LiveTracking";
import RouteMap from "./RouteMap";

function CaptainRiding() {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  // console.log("state:", location.state);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        translateY: "100%",
      });
    }
  }, [finishRidePanel]);

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

      <div className="h-[85%]">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="err"
        /> */}
        <RouteMap
          pickup={location?.state?.passenger?.pickup}
          drop={location?.state?.passenger?.destination}
        />
      </div>
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="h-[15%] p-6 bg-yellow-400 flex justify-between items-center"
      >
        <h4>4 KM Away</h4>
        <button className=" py-1.5 px-10 rounded-xl bg-green-700 text-white">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="bottom-0 fixed  z-60 w-full bg-white "
      >
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          passenger={location?.state?.passenger}
        />
      </div>
    </div>
  );
}

export default CaptainRiding;
