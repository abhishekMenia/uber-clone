import React from "react";

function CaptainDetails(props) {
  return (
    <div className="p-2">
      <div className="flex justify-between p-2 border-2 rounded-lg border-amber-200">
        <div className="flex">
          <img
            className="w-13 rounded-full object-cover px-2"
            src="https://preview.redd.it/1dosdhjx62l81.jpg?width=1080&crop=smart&auto=webp&s=cdf76e139329492f6bb7854efd723214cc48d6f5"
            alt="err"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold capitalize">{`${props.captainLogin.fullName.firstName} ${props.captainLogin.fullName.lastName} `}</h4>
            <span className="text-xs text-gray-400">Basic Level</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold">₹325.00</h4>
          <span className="text-xs text-gray-400">Earned</span>
        </div>
      </div>
      <div className="flex justify-evenly items-center mt-4  py-4 rounded-2xl bg-gray-100">
        <div className="flex flex-col items-center">
          <i className="fa fa-clock text-gray-400" aria-hidden="true"></i>
          <h4>10.2</h4>
          <span className="text-xs text-gray-400">HOURS ONLINE</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="fa fa-tachometer text-gray-400" aria-hidden="true"></i>
          <h4>35 KM</h4>
          <span className="text-xs text-gray-400">TOTAL DISTANCE</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="fa fa-file-text text-gray-400" aria-hidden="true"></i>
          <h4>20</h4>
          <span className="text-xs text-gray-400">TOTAL JOBS</span>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
