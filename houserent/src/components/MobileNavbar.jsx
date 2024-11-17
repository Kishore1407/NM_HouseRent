import React from "react";
import { House } from "lucide-react";
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard } from "lucide-react";
import { HousePlus } from "lucide-react";
import toast from "react-hot-toast";
import { LandPlot } from "lucide-react";
const MobileNavbar = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const login = () => {
    toast.error("Please login to your account");

    setTimeout(() => {
      navigate("/login");
    }, 300);
  };
  return (
    <div className="flex  w-full py-1 bg-white justify-between px-10 flex-wrap">
      <button
        className={`${isActive("/") ? " text-orange-500" : ""}`}
        onClick={() => navigate("/")}
      >
        <House />
      </button>
      <Link
        className={`${isActive("/search") ? " text-orange-500" : ""}`}
        to="/search"
      >
        <Search />
      </Link>
      {user && user.isAdmin && (
        <Link
          className={`${
            isActive("/admin/dashboard") ? " text-orange-500" : ""
          }`}
          to="/admin/dashboard"
        >
          <LayoutDashboard />
        </Link>
      )}
      {user && user.email ? (
        <button
          className={`${isActive("/profile") ? " text-orange-500" : ""}`}
          onClick={() => navigate("/profile")}
        >
          <User />
        </button>
      ) : (
        <button
          className={`${isActive("/login") ? " text-orange-500" : ""}`}
          onClick={() => login()}
        >
          <User />
        </button>
      )}
      {user && user.email && (
        <Link
          className={`${isActive("/createProperty") ? " text-orange-500" : ""}`}
          to="/createProperty"
        >
          <HousePlus />
        </Link>
      )}
      {user && user.email && (
        <Link
          className={`${isActive("/yourProperties") ? " text-orange-500" : ""}`}
          to="/yourProperties"
        >
          <LandPlot />
        </Link>
      )}
    </div>
  );
};

export default MobileNavbar;
