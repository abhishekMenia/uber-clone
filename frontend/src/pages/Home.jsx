import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../context/UserContext";

function Home() {
  const { user } = useContext(context);

  return (
    <div>
      <div className="h-screen w-full flex flex-col justify-between  ">
        <div className="h-screen bg-[url(https://images.unsplash.com/photo-1567536303373-0eb3957ba696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center ">
          <img
            className="w-15 m-6 rounded-md"
            src="https://www.logo.wine/a/logo/Uber/Uber-White-Dark-Background-Logo.wine.svg"
            alt="error loading"
          />
        </div>
        <div className="flex flex-col items-center pb-8 px-4">
          <h2 className="pt-9 pb-2 font-bold text-3xl">
            Get Started With Uber
          </h2>
          <NavLink
            className="bg-black text-white rounded w-full py-2  text-center"
            to={"/login"}
          >
            Continue
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
