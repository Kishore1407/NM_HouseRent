import React from "react";
import { Link } from "react-router-dom";
import GAuth from "./GAuth";
import Logout from "./Logout";
import Properties from "../property/Properties";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import MobileNavbar from "../components/MobileNavbar";
const Home = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  console.log(isAdmin, "from home");
  return (
    <div>
      {/* <Link to="/signup">signup</Link>
      <GAuth />
      <Link to="/login">Login</Link>
      {isAdmin && <Link to="/admin/dashboard">admin</Link>}
      <Logout /> */}
      {/* <Navbar /> */}
      <Link
        to="/"
        className="border-b sm:hidden font-medium text-lg w-full py-2 px-5 fixed top-0 z-10 bg-white"
      >
        House Rent
      </Link>
      <div className="sm:hidden py-5 pt-16">
        <Slider />
      </div>

      <div className="">
        <Link
          to="/admin/dashboard"
          className="sm:hidden font-semibold text-slate-400 px-5 text-lg "
        >
          Explore Properties{" "}
        </Link>
        <Properties />
      </div>
      {/* <div className="  sm:hidden fixed bottom-0 border-t py-3 w-full  bg-white">
        <MobileNavbar />
      </div> */}
    </div>
  );
};

export default Home;
