import React from "react";
import { axiosInstance } from "../../utility/axios";

function WaitingForDriver({ setWaitingDriver, rideAcceptedDetails, rideData }) {
  const handelCancelRide = async () => {
    const payload = {
      rideId: rideAcceptedDetails._id,
    };
    try {
      const res = await axiosInstance.patch(
        "/ride/passengerCancelled",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        setWaitingDriver(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col  bg-white p-4">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl ">Meet At Pickup Point</h4>
        <h4 className="font-semibold text-xl  text-white bg-black p-2">
          {rideData?.otp}
        </h4>
      </div>
      <div className="flex justify-between mt-2">
        <img
          className="w-25 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
          alt="err"
        />
        <div className="leading-2">
          <h4 className="font-medium text-lg capitalize">
            {rideAcceptedDetails?.captain?.fullName?.firstName +
              " " +
              rideAcceptedDetails?.captain?.fullName?.lastName}
          </h4>
          <h4>{rideAcceptedDetails?.captain?.vehicle?.plate}</h4>
          <p className="text-sm ">
            {rideAcceptedDetails?.captain?.vehicle?.color}
          </p>
        </div>
      </div>
      <div className="w-full border-2 border-gray-400"></div>
      <div className="flex flex-col mt-2 px-4 ">
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-map-marker px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">
              {rideAcceptedDetails?.distance}
            </h4>
            <h4 className="text-sm ">{rideAcceptedDetails?.pickup}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-location-arrow px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">
              {rideAcceptedDetails?.duration}
            </h4>
            <h4 className="text-sm ">{rideAcceptedDetails?.destination}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3">
          <i className="fa fa-credit-card px-5" aria-hidden="true"></i>{" "}
          <div>
            <h4 className="text-2xl font-semibold">
              ₹{rideAcceptedDetails?.fare}
            </h4>
            <h4 className="text-sm ">Cash Cash</h4>
          </div>
        </div>
        <button
          className="text-xl text-white bg-red-700 py-3 rounded-lg mt-2"
          onClick={handelCancelRide}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
}

export default WaitingForDriver;
