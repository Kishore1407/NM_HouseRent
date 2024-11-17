import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import GAuth from "./GAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/login`,
        {
          email,
          password,
        }
      );
      console.log(response?.data?.user, "user");
      console.log(response.data);
      console.log(response.data.token, "login token");
      // localStorage.setItem("JWTToken", response.data?.token);
      // localStorage.setItem("isAdmin", response.data?.isAdmin);
      // console.log(response.data.isAdmin, "admin Status");
      const { user, token } = response.data;
      const { isAdmin } = user;
      dispatch(
        logIn({
          email: response.data?.user?.email,
          _id: response.data?.user?._id,
          token: response?.data?.token,
          isAdmin: response?.data?.user?.isAdmin,
        })
      );
      console.log(response);

      setTimeout(() => {
        toast.success(response?.data?.message);
      }, 300);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(error.response?.data?.message);
      }, 300);
    }
  };
  return (
    <section className=" flex  items-center justify-center min-h-screen ">
      <div className="border flex flex-col gap-5  sm:p-10  p-5 rounded-lg shadow-lg">
        <h1>Login</h1>
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
              onClick={(e) => login(e)}
              className="border p-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="border"></div>
          <div className="flex items-center gap-2">
            <p className="text-xs">Don't have an account?</p>
            <Link to="/signup " className="hover:underline text-sm">
              Register Now
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
  );
};

export default Login;
