import React from "react";

function RidePopUp({
  setRidePopUpPanel,
  setAcceptRidePanel,
  passenger,
  confirmRide,
}) {
  console.log("abc :", passenger);
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl ">Available Rides !!</h4>
        <h4>
          <i
            className="fa fa-angle-double-down"
            onClick={() => {
              setRidePopUpPanel(false);
            }}
            aria-hidden="true"
          ></i>
        </h4>
      </div>
      <div className="flex justify-between mt-2 p-4 bg-amber-300 rounded-2xl">
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
            </h4>
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col border-b-2 p-2 border-gray-200 ">
          <p className="text-sm text-gray-400">PICK UP</p>
          <h4>{passenger?.pickup}</h4>
        </div>
        <div className="flex flex-col border-b-2 p-2 border-gray-200 ">
          <p className="text-sm text-gray-400">DROP OFF</p>
          <h4>{passenger?.destination}</h4>
        </div>
      </div>
      <div className="flex mt-2 justify-end gap-2 p-2">
        <button
          className=" py-1.5 px-10 rounded-xl bg-gray-200"
          onClick={() => {
            setRidePopUpPanel(false);
          }}
        >
          Ignore
        </button>
        <button
          className=" py-1.5 px-10 rounded-xl bg-green-700 text-white"
          onClick={() => {
            confirmRide(passenger?._id);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default RidePopUp;
