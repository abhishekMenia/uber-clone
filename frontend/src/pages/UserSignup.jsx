import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function UserSignup() {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => ({
      ...prevUser,
      fullName:
        name === "firstName" || name === "lastName"
          ? { ...prevUser.fullName, [name]: value }
          : prevUser.fullName,
      ...(name !== "firstName" && name !== "lastName" && { [name]: value }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      fullName: {
        firstName: "",
        lastName: "",
      },
      email: "",
      password: "",
    });
    console.log(user);
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-20 mb-5 rounded-md"
            src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
            alt="error loading"
          />
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium mb-2">What's your Name</h3>
            <div className="flex gap-4 w-full mb-7">
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-1/2 "
                type="text"
                required
                name="firstName"
                value={user.fullName.firstName}
                onChange={handleChange}
                placeholder="First Name"
                autoComplete="off"
              />
              <input
                className="rounded-md bg-gray-200 p-3  placeholder:text-base w-1/2  "
                type="text"
                required
                name="lastName"
                value={user.fullName.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                autoComplete="off"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="rounded-md bg-gray-200 p-3  placeholder:text-base w-full mb-7 "
              type="email"
              required
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <div>
              <button
                type="submit"
                className="border bg-black text-white font-semibold w-full py-2 rounded-md mb-3"
              >
                SignUp
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an Account ?{" "}
            <NavLink className={"text-blue-500"} to={"/login"}>
              Login
            </NavLink>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            By proceeding, you agree to Uber's Terms of Service and confirm you
            have read Uber's Privacy Policy and Cookie Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
