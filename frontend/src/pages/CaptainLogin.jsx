import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptianContext";
import axios from "axios";

const CaptainLogin = () => {
  const { setCaptainLogin, setCaptainToken } = useContext(captainDataContext);
  const navigate = useNavigate();

  const [show, setShow] = useState({
    open: false,
    error: false,
    success: false,
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captain
      );
      console.log(res.data.captain);

      if (res.status === 200) {
        setShow({
          open: true,
          error: false,
          success: true,
        });
        setCaptain({
          email: "",
          password: "",
        });
        setCaptainLogin(res.data.captain);
        setCaptainToken(res.data.token);
        navigate("/captainHome");
      } else {
        setShow({
          open: true,
          error: true,
          success: false,
        });
      }
    } catch (error) {
      console.error(error.message);
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
    <>
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
    </>
  );
};

export default CaptainLogin;
