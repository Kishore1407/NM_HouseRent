import axios from "axios";
import React, { useState } from "react";
import GAuth from "./GAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const sigup = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/signup`,
        { email, password }
      );
      console.log(response);
      setTimeout(() => {
        toast.success(response?.data?.message);
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(error.response?.data?.message);
      }, 300);
    }
  };
  return (
    <>
      <section className=" flex  items-center justify-center min-h-screen ">
        <div className="border flex flex-col gap-5 p-5 sm:p-10  rounded-lg shadow-lg">
          <h1>Signup</h1>
          <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-10">
              <label>Email</label>
              <input
                type="email"
                placeholder="email"
                value={email}
                className="border p-2 outline-none rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Password</label>
              <input
                className="border rounded-lg p-2 outline-none"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={(e) => sigup(e)}
                className="border p-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="border"></div>
            <div className="flex items-center gap-2">
              <p className="text-xs">Already have an account?</p>
              <Link to="/login " className="hover:underline text-sm">
                Login Now
              </Link>
            </div>
            {/* <div className="flex items-center  mx-auto">
            <button className="border flex items-center gap-2 p-2 text-sm rounded-lg">
              <FaGoogle /> Login with Google
            </button>
          </div> */}
            <GAuth />
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
