import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utility/axios";

const FinishRide = ({ setFinishRidePanel, passenger }) => {
  // console.log({ passenger });
  const handelCompleteRide = async () => {
    const payload = {
      rideId: passenger._id,
    };
    try {
      const res = await axiosInstance.patch("/ride/completed", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("captainToken"),
        },
      });
      // console.log(res);
      if (res.status === 200) {
        navigate("/captainHome");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  bg-white p-2">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl ">Finish This Ride</h4>
        <h4>
          <i
            className="fa fa-angle-double-down"
            onClick={() => {
              setFinishRidePanel(false);
            }}
            aria-hidden="true"
          ></i>
        </h4>
      </div>
      <div className="flex justify-between p-2 rounded-lg border-2 border-amber-200  items-center mt-5">
        <div className="flex  items-center ">
          <img
            className="w-13 rounded-full object-cover px-2"
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt="err"
          />

          <h4 className="font-semibold capitalize">
            {passenger?.user?.fullName?.firstName +
              " " +
              passenger?.user?.fullName?.lastName}
          </h4>
        </div>
        <h4 className="font-semibold">{passenger?.distance}</h4>
      </div>
      <div className="flex flex-col mt-2 px-4 ">
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-map-marker px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">{passenger?.distance}</h4>
            <h4 className="text-sm ">{passenger?.pickup}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-location-arrow px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">{passenger?.duration}</h4>
            <h4 className="text-sm ">{passenger?.destination}</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3">
          <i className="fa fa-credit-card px-5" aria-hidden="true"></i>{" "}
          <div>
            <h4 className="text-2xl font-semibold">₹{passenger?.fare}</h4>
            <h4 className="text-sm ">Cash Cash</h4>
          </div>
        </div>
      </div>
      <button
        className="text-xl text-white bg-green-700 py-3 rounded-lg mt-10 mb-2"
        onClick={handelCompleteRide}
      >
        Finish Ride
      </button>
    </div>
  );
};

export default FinishRide;
