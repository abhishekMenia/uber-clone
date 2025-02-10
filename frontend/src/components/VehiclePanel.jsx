import React from "react";

function VehiclePanel({ setVehiclePanelOpen, setConfirmPanelOpen }) {
  return (
    <>
      <div className="flex flex-col  bg-white p-2">
        <div className="flex justify-between">
          <h4 className="font-semibold text-xl ">Choose a Vehicle</h4>
          <h4>
            <i
              className="fa fa-angle-double-down"
              onClick={() => {
                setConfirmPanelOpen(true);
                setVehiclePanelOpen(false);
              }}
              aria-hidden="true"
            ></i>
          </h4>
        </div>

        <div
          className="flex justify-between items-center px-4 py-3 w-full mt-2 active:border-gray-400 rounded-2xl border-gray-100 border-2"
          onClick={() => {
            setConfirmPanelOpen(true);
            setVehiclePanelOpen(false);
          }}
        >
          <img
            className="w-25"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
            alt="err"
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h4 className="font-semibold">
                UberX <i className="fa fa-user" aria-hidden="true"></i>
                <span>4</span>
              </h4>
              <h4>3 min away.</h4>
              <h4 className="text-xs">Comfort, Cheaper</h4>
            </div>
            <h4 className="font-semibold">$789.90</h4>
          </div>
        </div>
        <div
          className="flex justify-between items-center px-4 py-3 w-full mt-2 active:border-gray-400 rounded-2xl border-gray-100 border-2"
          onClick={() => {
            setConfirmPanelOpen(true);
            setVehiclePanelOpen(false);
          }}
        >
          <img
            className="w-25"
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
            alt="err"
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h4 className="font-semibold">
                UberAuto <i className="fa fa-user" aria-hidden="true"></i>
                <span>3</span>
              </h4>
              <h4>2 min away.</h4>
              <h4 className="text-xs">Affordable, Cheaper</h4>
            </div>
            <h4 className="font-semibold">$89.90</h4>
          </div>
        </div>
        <div
          className="flex justify-between items-center  px-4 py-3 w-full mt-2 active:border-gray-400 rounded-2xl border-gray-100 border-2"
          onClick={() => {
            setConfirmPanelOpen(true);
            setVehiclePanelOpen(false);
          }}
        >
          <img
            className="w-25"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt="err"
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h4 className="font-semibold">
                UberMoto <i className="fa fa-user" aria-hidden="true"></i>
                <span>1</span>
              </h4>
              <h4>2 min away.</h4>
              <h4 className="text-xs"> Cheaper</h4>
            </div>
            <h4 className="font-semibold">$39.90</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehiclePanel;
