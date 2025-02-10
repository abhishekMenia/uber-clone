import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/UserContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

function UserHome() {
  const { userLogin } = useContext(context);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmPanelOpen, setConfirmPanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [trip, setTrip] = useState({
    pickup: "",
    destination: "",
  });

  const panelRef = useRef(null);
  const arrowRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip(() => ({
      ...trip,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    console.log("Trip details:", trip);
    setTrip({
      pickup: "",
      destination: "",
    });
  };

  ///gsap used
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(arrowRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(arrowRef.current, {
        opacity: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: "100%",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmPanelOpen) {
      gsap.to(confirmPanelRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        translateY: "100%",
      });
    }
  }, [confirmPanelOpen]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(lookingForDriverRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        translateY: "100%",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitingDriver) {
      gsap.to(waitingForDriverRef.current, {
        translateY: "0%",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        translateY: "100%",
      });
    }
  }, [waitingDriver]);

  return (
    <>
      <div className="h-screen  relative overflow-hidden">
        <img
          className="w-16 absolute ml-2 top-2"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="err loading"
        />
        <div className=" mb-3 h-screen w-screen ">
          {/* <p>welcome {userLogin?.fullName?.firstName} !!</p> */}
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="err"
          />
        </div>
        <div className="h-screen flex flex-col justify-end absolute top-0 w-full ">
          <div className="p-5 h-[30%] bg-white relative ">
            <div className="flex justify-between">
              <h4 className="font-semibold text-2xl ">Find Trip </h4>
              <i
                ref={arrowRef}
                onClick={() => setPanelOpen(false)}
                className="fa fa-chevron-circle-down"
                aria-hidden="true"
              ></i>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="border absolute h-20 w-0 top-20 left-10"></div>
              <input
                className="w-full bg-gray-200 px-12 py-3 mt-3 rounded-lg "
                type="text"
                name="pickup"
                value={trip.pickup}
                onChange={handleChange}
                required
                onClick={() => setPanelOpen(true)}
                placeholder="Add pick-up location"
              />

              <input
                className="w-full bg-gray-200 px-12 py-3 mt-3 rounded-lg "
                type="text"
                name="destination"
                value={trip.destination}
                onChange={handleChange}
                required
                onClick={() => setPanelOpen(true)}
                placeholder="Enter your destination"
              />
              {/* <button type="submit">lksd</button> */}
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-[0]  ">
            <LocationPanel
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
            ></LocationPanel>
          </div>
        </div>

        <div ref={vehiclePanelRef} className="bottom-0 fixed z-10 w-full ">
          <VehiclePanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmPanelOpen={setConfirmPanelOpen}
          ></VehiclePanel>
        </div>

        <div ref={confirmPanelRef} className="bottom-0 fixed z-10 w-full ">
          <ConfirmRide
            setConfirmPanelOpen={setConfirmPanelOpen}
            setVehicleFound={setVehicleFound}
          ></ConfirmRide>
        </div>

        <div ref={lookingForDriverRef} className="bottom-0 fixed z-10 w-full ">
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            setWaitingDriver={setWaitingDriver}
          ></LookingForDriver>
        </div>

        <div ref={waitingForDriverRef} className="bottom-0 fixed z-10 w-full ">
          <WaitingForDriver
            setWaitingDriver={setWaitingDriver}
          ></WaitingForDriver>
        </div>
      </div>
    </>
  );
}

export default UserHome;
