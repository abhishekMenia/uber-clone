import React from "react";

function WaitingForDriver({ setWaitingDriver }) {
  return (
    <div className="flex flex-col  bg-white p-2">
      <div className="flex justify-between">
        <h4 className="font-semibold text-xl ">Meet At Pickup Point</h4>
        <h4 className="font-semibold text-xl text-white bg-black p-2">2 Min</h4>
      </div>
      <div className="flex justify-between mt-2">
        <img
          className="w-25 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
          alt="err"
        />
        <div className="leading-2">
          <h4 className="font-medium text-lg">Abhishek Menia</h4>
          <h4>JK02 AU 1234</h4>
          <p className="text-sm ">Maruti Swift </p>
        </div>
      </div>
      <div className="w-full border-2 border-gray-400"></div>
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
        <button
          className="text-xl text-white bg-red-700 py-3 rounded-lg mt-2"
          onClick={() => {
            setWaitingDriver(false);
          }}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
}

export default WaitingForDriver;
