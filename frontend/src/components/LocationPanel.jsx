import React from "react";

function LocationPanel({ setVehiclePanelOpen, setPanelOpen }) {
  const location = [
    " Plot No. C-184, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160071",
    " Phase­VIII­D, Plot No. C-182, Industrial Area, Sector 95, Sahibzada Ajit Singh Nagar, Punjab 160071",
    " Phase­VIII­A, Plot No. A-194, Industrial Area, Sector 115, Sahibzada Ajit Singh Nagar, Punjab 160071",
    " Phase­VIII­B, Plot No. D-123, Industrial Area, Sector 45, Sahibzada Ajit Singh Nagar, Punjab 160071",
  ];

  return (
    <div>
      <div className="flex flex-col gap-2 mt-2 px-5 w-full">
        {location.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center w-full active:border-gray-400 rounded-2xl p-2 border-gray-100 border-2"
              onClick={() => {
                setVehiclePanelOpen(true);
                setPanelOpen(false);
              }}
            >
              <div className="p-3 flex justify-center items-center bg-gray-200 w-10 h-full rounded-4xl">
                <i className="fa fa-map-marker " aria-hidden="true"></i>
              </div>

              <h4 className="w-[80%] font-semibold">{item}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationPanel;
