import React from "react";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel }) => {
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

          <h4 className="font-semibold">Esther Berry</h4>
        </div>
        <h4 className="font-semibold">2.2 KM</h4>
      </div>
      <div className="flex flex-col mt-2 px-4 ">
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-map-marker px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">567/11-A</h4>
            <h4 className="text-sm ">Kainkondrathali, Bengaluru, karnataka</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3 border-b-2 border-gray-300">
          <i className="fa fa-location-arrow px-5" aria-hidden="true"></i>
          <div>
            <h4 className="text-2xl font-semibold">Aknoor Jammu</h4>
            <h4 className="text-sm ">Kainkondrathali, Bengaluru, karnataka</h4>
          </div>
        </div>
        <div className="flex justify-start items-center mb-3">
          <i class="fa fa-credit-card px-5" aria-hidden="true"></i>{" "}
          <div>
            <h4 className="text-2xl font-semibold">$789.90</h4>
            <h4 className="text-sm ">Cash Cash</h4>
          </div>
        </div>
      </div>
      <button
        className="text-xl text-white bg-green-700 py-3 rounded-lg mt-10 mb-2"
        onClick={() => {
          navigate("/captainHome");
        }}
      >
        Finish Ride
      </button>
    </div>
  );
};

export default FinishRide;
