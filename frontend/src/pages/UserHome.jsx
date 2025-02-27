import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/UserContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { axiosInstance } from "../../utility/axios";
import { socketContextData } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function UserHome() {
  const { userLogin } = useContext(context);
  const { sendMessage, receiveMessage, socket } = useContext(socketContextData);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmPanelOpen, setConfirmPanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [distanceTime, setDistanceTime] = useState();
  const [rideAcceptedDetails, setRideAcceptedDetails] = useState({});
  const [rideData, setRideData] = useState();
  const [location, setLocation] = useState({
    data: [],
    loc: "",
  });
  const [trip, setTrip] = useState({
    pickup: "",
    destination: "",
  });
  const [searchTerm, setSearchTerm] = useState({ name: "", value: "" });
  const [vehicleSelected, setVehicleSelected] = useState("");

  const panelRef = useRef(null);
  const arrowRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  // console.log("user :", userLogin);

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: userLogin._id });
  }, []);
  socket.on("rideConfirmed", (data) => {
    console.log("ride accepted :", data);
    setWaitingDriver(true);
    setRideAcceptedDetails(data);
  });
  socket.on("rideOngoing", (data) => {
    console.log("ride ongoing :", data);
    setWaitingDriver(false);
    navigate("/ride", { state: { rideAcceptedDetails: rideAcceptedDetails } });
    // setRideAcceptedDetails(data);
  });
  socket.on("rideCompleted", (data) => {
    console.log("ride completed :", data);
    setWaitingDriver(false);
    // setRideAcceptedDetails(data);
  });
  socket.on("rideCancelled", (data) => {
    console.log("ride cancelled :", data);
    setWaitingDriver(false);
    // setRideAcceptedDetails(data);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSearchTerm({ name, value });
  };

  useEffect(() => {
    if (!searchTerm.value.trim()) return;

    const delay = setTimeout(async () => {
      try {
        const res = await axiosInstance.get(
          `/map/getSuggestions?input=${searchTerm.value}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        );

        if (res.status === 200) {
          setLocation({
            data: res.data,
            loc: searchTerm.name,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }, 500); // 1-second debounce

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trip details:", trip);

    try {
      const res = await axiosInstance.get(
        `/map/getDistanceTime?origin=${trip.pickup}&destination=${trip.destination}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      console.log("res :", res);

      if (res.status === 200) {
        setDistanceTime(res.data);
        setVehiclePanelOpen(true);
        setPanelOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  ///gsap used
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        zIndex: 60,
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
      <div className="h-screen  relative overflow-hidden ">
        <img
          className="w-16 absolute ml-2 top-2"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="err loading"
        />
        <div className=" h-[65%]  ">
          {/* <p>welcome {userLogin?.fullName?.firstName} !!</p> */}
          {/* <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="err"
          /> */}
          <LiveTracking />
        </div>
        <div className="h-screen flex flex-col justify-end absolute top-0 w-full ">
          <div className="p-5 h-[35%] bg-white relative z-60 ">
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
                className="w-full bg-gray-200 px-12 py-3 mt-3 rounded-lg overflow-ellipsis"
                type="text"
                name="pickup"
                value={trip.pickup}
                onChange={handleChange}
                required
                onClick={() => setPanelOpen(true)}
                placeholder="Add pick-up location"
              />

              <input
                className="w-full bg-gray-200 px-12 py-3 mt-3 rounded-lg overflow-ellipsis"
                type="text"
                name="destination"
                value={trip.destination}
                onChange={handleChange}
                required
                onClick={() => setPanelOpen(true)}
                placeholder="Enter your destination"
              />
              <button
                disabled={!trip.pickup || !trip.destination}
                className="bg-black text-white py-2 w-full rounded-lg mt-3 mb-2 font-semibold text-lg disabled:bg-gray-400"
                type="submit"
              >
                Find Ride
              </button>
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-[0]   overflow-y-auto  ">
            <LocationPanel
              setTrip={setTrip}
              location={location}
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
            ></LocationPanel>
          </div>
        </div>

        <div ref={vehiclePanelRef} className="bottom-0 fixed z-60 w-full ">
          <VehiclePanel
            setPanelOpen={setPanelOpen}
            distanceTime={distanceTime}
            setVehicleSelected={setVehicleSelected}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmPanelOpen={setConfirmPanelOpen}
          ></VehiclePanel>
        </div>

        <div ref={confirmPanelRef} className="bottom-0 fixed z-60 w-full ">
          <ConfirmRide
            trip={trip}
            vehicleSelected={vehicleSelected}
            distanceTime={distanceTime}
            setConfirmPanelOpen={setConfirmPanelOpen}
            setVehicleFound={setVehicleFound}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setRideData={setRideData}
          ></ConfirmRide>
        </div>

        <div ref={lookingForDriverRef} className="bottom-0 fixed z-60 w-full ">
          <LookingForDriver
            rideData={rideData}
            vehicleSelected={vehicleSelected}
            trip={trip}
            distanceTime={distanceTime}
            setConfirmPanelOpen={setConfirmPanelOpen}
            setVehicleFound={setVehicleFound}
            setWaitingDriver={setWaitingDriver}
          ></LookingForDriver>
        </div>

        <div ref={waitingForDriverRef} className="bottom-0 fixed z-60 w-full ">
          <WaitingForDriver
            rideData={rideData}
            setWaitingDriver={setWaitingDriver}
            rideAcceptedDetails={rideAcceptedDetails}
          ></WaitingForDriver>
        </div>
      </div>
    </>
  );
}

export default UserHome;
