import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CaptainLogin = () => {
  const [captain, setCaptain] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCaptain(() => ({
      ...captain,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptain({
      email: "",
      password: "",
    });
    console.log(captain);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5 rounded-md"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="error loading"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full mb-7 "
            type="email"
            required
            name="email"
            value={captain.email}
            onChange={handleChange}
            placeholder="email@example.com"
            autoComplete="off"
          />
          <h3 className="text-lg font-medium  mb-2">Password</h3>
          <input
            className="rounded-md bg-gray-200 p-3 placeholder:text-base w-full mb-7 "
            type="password"
            required
            name="password"
            value={captain.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <div>
            <button
              type="submit"
              className="border bg-black text-white font-semibold w-full py-2 rounded-md mb-3"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          New Here ?{" "}
          <NavLink className={"text-blue-500"} to={"/captainSignup"}>
            Register as Captain
          </NavLink>
        </p>
      </div>
      <div>
        <NavLink
          to={"/login"}
          className="border flex justify-center bg-orange-500 text-white font-semibold w-full py-2 rounded-md"
        >
          Sign in as User
        </NavLink>
      </div>
    </div>
  );
};

export default CaptainLogin;
