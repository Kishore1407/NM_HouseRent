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
    <section className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="border rounded shadow-lg p-4 p-sm-5 bg-white">
        <h1 className="text-center mb-4">Login</h1>
        <form className="d-flex flex-column gap-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              onClick={(e) => login(e)}
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>

          <div className="border-top my-3"></div>

          <div className="d-flex justify-content-center align-items-center">
            <p className="mb-0 small me-2">Don't have an account?</p>
            <Link to="/signup" className="text-primary text-decoration-none">
              Register Now
            </Link>
          </div>
        </form>
        <div className="text-center mt-3">
          <GAuth />
        </div>
      </div>
    </section>
  );
};

export default Login;
