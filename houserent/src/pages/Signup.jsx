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
      <section className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="border rounded shadow-lg p-4 p-sm-5 bg-white">
          <h1 className="text-center mb-4">Signup</h1>
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
                onClick={(e) => signup(e)}
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>

       
            <div className="border-top my-3"></div>

            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0 small me-2">Already have an account?</p>
              <Link to="/login" className="text-primary text-decoration-none">
                Login Now
              </Link>
            </div>

          
            <div className="text-center mt-3">
              <GAuth />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
