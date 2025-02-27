import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utility/axios";

const AcceptRide = ({ setAcceptRidePanel, setRidePopUpPanel, passenger }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rideId: passenger._id,
      otp: otp,
    };
    try {
      const res = await axiosInstance.post("/ride/checkOtp", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("captainToken"),
        },
      });
      // console.log(res);
      if (res.status === 200) {
        navigate("/captainRiding", { state: { passenger: passenger } });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelCancelRide = async () => {
    const payload = {
      rideId: passenger._id,
    };
    try {
      const res = await axiosInstance.patch("/ride/captainCancelled", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("captainToken"),
        },
      });
      // console.log(res);
      if (res.status === 200) {
        // navigate("/captainHome");
        setRidePopUpPanel(false);
        setAcceptRidePanel(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl mb-5 ">Available Rides !!</h4>
        <h4>
          <i
            className="fa fa-angle-double-down"
            onClick={() => {
              setAcceptRidePanel(false);
            }}
            aria-hidden="true"
          ></i>
        </h4>
      </div>
      <div className="flex justify-between mt-2 mb-2 p-3 bg-amber-300 rounded-2xl">
        <div className="flex ">
          <img
            className="w-13 rounded-full object-cover px-2"
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt="err"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold capitalize">
              {passenger?.user?.fullName?.firstName +
                " " +
                passenger?.user?.fullName?.lastName}
            </h4>{" "}
            <div className="flex gap-2">
              <span className="text-xs rounded-md bg-gray-400 p-1">
                ApplePay
              </span>
              <span className="text-xs rounded-md bg-gray-400 p-1">
                Discount
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold">₹{passenger?.fare}</h4>
          <span className="text-xs text-gray-400">{passenger?.distance}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col border-b-2 p-2 border-gray-200 ">
          <p className="text-sm text-gray-400">PICK UP</p>
          <h4>{passenger?.pickup}</h4>
        </div>
        <div className="flex flex-col border-b-2 p-2 border-gray-200 ">
          <p className="text-sm text-gray-400">DROP OFF</p>
          <h4>{passenger?.destination}</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="font-mono border-2 border-gray-200 w-full mt-5 px-4 py-2 rounded-2xl text-center"
          type="number"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex flex-col w-full mt-2 justify-end gap-4 p-2">
          <button
            type="submit"
            className=" py-1.5 px-10 rounded-xl bg-green-700 text-white"
          >
            Confirm Ride
          </button>
          <button
            type="button"
            className=" py-1.5 px-10 rounded-xl bg-red-500 text-white"
            onClick={handelCancelRide}
          >
            Cancel Ride
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptRide;
