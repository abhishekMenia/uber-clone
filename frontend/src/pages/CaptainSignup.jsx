import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const CaptainSignup = () => {
  const [show, setShow] = useState({
    open: false,
    error: false,
    success: false,
  });
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    vehicle: {
      vehicleType: "",
      color: "",
      plate: "",
      capacity: "",
    },
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCaptain((prevcaptain) => ({
      ...prevcaptain,
      fullName:
        name === "firstName" || name === "lastName"
          ? { ...prevcaptain.fullName, [name]: value }
          : prevcaptain.fullName,
      vehicle:
        name === "vehicleType" ||
        name === "color" ||
        name === "plate" ||
        name === "capacity"
          ? { ...prevcaptain.vehicle, [name]: value }
          : prevcaptain.vehicle,
      ...((name === "email" || name === "password") && { [name]: value }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captain
      );
      console.log(res);
      if (res.status === 200) {
        setShow({
          open: true,
          error: false,
          success: true,
        });
        setCaptain({
          fullName: {
            firstName: "",
            lastName: "",
          },
          email: "",
          password: "",
          vehicle: {
            vehicleType: "",
            color: "",
            plate: "",
            capacity: "",
          },
        });
      } else {
        setShow({
          open: true,
          error: true,
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
      setShow({
        open: true,
        error: true,
        success: false,
      });
    }
  };

  setTimeout(() => {
    if (show.open === true) {
      setShow({
        open: false,
        error: false,
        success: false,
      });
    }
  }, 2000);
  return (
    <div>
      {show.open && (
        <div className="pt-2 absolute w-full flex justify-center items-center">
          {show.success && (
            <div className="w-50 border rounded-2xl bg-green-300 p-4 text-center">
              successfully
            </div>
          )}
          {show.error && (
            <div className="w-50 border rounded-2xl bg-red-300 p-4 text-center">
              error
            </div>
          )}
        </div>
      )}
      <div className="p-7 pt-3 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-3 rounded-md"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="error loading"
          />
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium mb-2">What's your Name</h3>
            <div className="flex gap-4 w-full mb-5">
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-1/2 "
                type="text"
                required
                name="firstName"
                value={captain.fullName.firstName}
                onChange={handleChange}
                placeholder="First Name"
                autoComplete="off"
              />
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-1/2  "
                type="text"
                required
                name="lastName"
                value={captain.fullName.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                autoComplete="off"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">About Vehicle</h3>
            <div className="grid grid-cols-2 gap-4 w-full mb-5">
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full "
                type="text"
                required
                name="color"
                value={captain.vehicle.color}
                onChange={handleChange}
                placeholder="color"
                autoComplete="off"
              />
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full  "
                type="text"
                required
                name="plate"
                value={captain.vehicle.plate}
                onChange={handleChange}
                placeholder="plate"
                autoComplete="off"
              />
              {/* <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full "
                type="text"
                required
                name="vehicleType"
                value={captain.vehicle.vehicleType}
                onChange={handleChange}
                placeholder="vehicleType"
                autoComplete="off"
              /> */}

              <select
                className=" rounded-md bg-gray-200 p-3 border-0  placeholder:text-base w-fit inline-block overflow-hidden max-w-full"
                required
                name="vehicleType"
                value={captain.vehicle.vehicleType}
                onChange={handleChange}
                placeholder="vehicleType"
              >
                <option className="text-xs" value="">
                  default: vehicleType
                </option>
                <option className="text-xs" value="auto">
                  Auto
                </option>
                <option className="text-xs " value="moterCycle">
                  MoterCycle
                </option>
                <option className="text-xs " value="car">
                  Car
                </option>
              </select>

              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full  "
                type="number"
                required
                name="capacity"
                value={captain.vehicle.capacity}
                onChange={handleChange}
                placeholder="capacity"
                autoComplete="off"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full mb-5 "
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
              className="rounded-md bg-gray-200 p-3 placeholder:text-base w-full mb-5 "
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
                Register
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an Account ?{" "}
            <NavLink className={"text-blue-500"} to={"/captainLogin"}>
              Login
            </NavLink>
          </p>
        </div>
        {/* <div>
          <p className="text-[10px] leading-tight">
            By proceeding, you agree to Uber's Terms of Service and confirm you
            have read Uber's Privacy Policy and Cookie Policy.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default CaptainSignup;
