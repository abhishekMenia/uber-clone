import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LiveTracking from "./LiveTracking";
import RouteMap from "./RouteMap";

function UserRide() {
  const loc = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-screen ">
      <Link
        to={"/home"}
        className="absolute top-5 right-5 bg-white p-2 rounded-2xl cursor-pointer"
      >
        <i className="fa fa-home" aria-hidden="true"></i>
      </Link>
      <div className="h-[50%]">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="err"
        /> */}
        <RouteMap
          pickup={loc?.state?.rideAcceptedDetails?.pickup}
          drop={loc?.state?.rideAcceptedDetails?.destination}
        />
      </div>
      <div className="h-[50%]  p-4">
        <div className="flex justify-between mt-2">
          <img
            className="w-25 "
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
            alt="err"
          />
          <div className="leading-2">
            <h4 className="font-medium text-lg capitalize mb-1">
              {loc?.state?.rideAcceptedDetails?.captain?.fullName?.firstName +
                " " +
                loc?.state?.rideAcceptedDetails?.captain?.fullName?.lastName}
            </h4>
            <h4>{loc?.state?.rideAcceptedDetails?.captain?.vehicle?.plate}</h4>
            <p className="text-sm mt-1 ">
              {loc?.state?.rideAcceptedDetails?.captain?.vehicle?.color}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-2 px-4 ">
          <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
            <i className="fa fa-location-arrow px-5" aria-hidden="true"></i>
            <div>
              <h4 className="text-sm ">
                {loc?.state?.rideAcceptedDetails?.pickup}
              </h4>
              <h4 className="text-sm ">
                {loc?.state?.rideAcceptedDetails?.destination}{" "}
              </h4>
            </div>
          </div>
          <div className="flex justify-start items-center mb-3">
            <i className="fa fa-credit-card px-5" aria-hidden="true"></i>{" "}
            <div>
              <h4 className="text-2xl font-semibold">
                ₹{loc?.state?.rideAcceptedDetails?.fare}
              </h4>
              {/* <h4 className="text-sm ">Cash Cash</h4> */}
            </div>
          </div>
          <button
            className="text-xl text-white bg-green-700 py-3 rounded-lg m-2"
            onClick={() => {
              navigate("/home");
            }}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRide;
