import React from "react";

function LocationPanel({
  setVehiclePanelOpen,
  setPanelOpen,
  location,
  setTrip,
}) {
  console.log("location", location);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 mt-2 mb-2 px-5 w-full">
        {location?.data?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center w-full active:border-gray-400 rounded-2xl p-2 border-gray-100 border-2"
              onClick={() => {
                // setVehiclePanelOpen(true);
                // setPanelOpen(false);
                setTrip((prev) => ({
                  ...prev,
                  [location.loc]: item.description,
                }));
              }}
            >
              <div className="p-3 flex justify-center items-center bg-gray-200 w-10 h-full rounded-4xl">
                <i className="fa fa-map-marker " aria-hidden="true"></i>
              </div>

              <h4 className="w-[80%] font-semibold">{item.description}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationPanel;
