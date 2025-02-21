import React, { useEffect } from "react";

function LookingForDriver({
  setVehicleFound,
  setWaitingDriver,
  setConfirmPanelOpen,
  vehicleSelected,
  trip,
  distanceTime,
  rideData,
}) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setWaitingDriver(true);
  //     setVehicleFound(false);
  //   }, 3000);
  // }, []);

  console.log("rideData :", rideData);

  const image =
    vehicleSelected === "car"
      ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
      : vehicleSelected === "auto"
      ? "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
      : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";

  return (
    <div className="flex flex-col  bg-white p-2">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl ">Looking for a Driver</h4>
        <h4>
          <i
            className="fa fa-angle-double-down"
            onClick={() => {
              setVehicleFound(false);
              setConfirmPanelOpen(true);
            }}
            aria-hidden="true"
          ></i>
        </h4>
      </div>
      <div className="flex justify-center mt-2">
        <img className="w-25 " src={image} alt="err" />
      </div>
      <div className="w-full border-2 border-gray-400"></div>
      <div className="flex flex-col mt-2 px-4 ">
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-map-marker px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">
              {distanceTime?.distanceTime?.distance?.text}
            </h4>
            <h4 className="text-sm ">{trip?.pickup}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-location-arrow px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">
              {distanceTime?.distanceTime?.duration?.text}
            </h4>
            <h4 className="text-sm ">{trip?.destination}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3">
          <i class="fa fa-credit-card px-5" aria-hidden="true"></i>{" "}
          <div>
            <h4 className="text-2xl font-semibold">
              ₹{distanceTime?.fare[vehicleSelected]}
            </h4>
            <h4 className="text-sm ">Cash Cash</h4>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          {rideData?.status === "pending" && (
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default LookingForDriver;
