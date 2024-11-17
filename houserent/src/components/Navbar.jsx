import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../store/slices/userSlice";
import toast from "react-hot-toast";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const signOut = () => {
    dispatch(logOut());
    setTimeout(() => {
      navigate("/");
      toast.success("Logout success");
    }, 300);
  };
  // console.log(user.isAdmin, "admin");
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex   justify-between w-full items-center px-5  ">
      {/* <Link to="/signup">signup</Link>
      <GAuth />
      <Link to="/login">Login</Link>
      {isAdmin && <Link to="/admin/dashboard">admin</Link>}
      <Logout /> */}
      <Link to="/" className="font-semibold text-xl">
        HouseRent
      </Link>
      <div className="flex  items-center gap-10 pr-10">
        <Link
          to="/signup"
          className={`${
            isActive("/signup") ? "underline text-orange-500" : ""
          }`}
        >
          signup{" "}
        </Link>
        {user && user.isAdmin && (
          <Link
            className={`${
              isActive("/admin/dashboard") ? " text-orange-500" : ""
            }`}
            to="/admin/dashboard"
          >
            Admin
          </Link>
        )}
        {user && user.email ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <Link
            to="/login"
            className={`${
              isActive("/login") ? "underline text-orange-500" : ""
            }`}
          >
            Login
          </Link>
        )}
        <Link
          className={`${
            isActive("/search") ? "underline text-orange-500" : ""
          }`}
          to="/search"
        >
          Search
        </Link>
        {user && user.email && (
          <Link
            className={`${
              isActive("/profile") ? "underline text-orange-500" : ""
            }`}
            to="/profile"
          >
            Profile
          </Link>
        )}
        {user && user.email && (
          <Link
            className={`${
              isActive("/createProperty") ? "underline text-orange-500" : ""
            }`}
            to="/createProperty"
          >
            Create Property
          </Link>
        )}
        {user && user.email && (
          <Link
            className={`${
              isActive("/yourProperties") ? "underline text-orange-500" : ""
            }`}
            to="/yourProperties"
          >
            Your Property
          </Link>
        )}
        {user && user.email && (
          <Link
            className={`${
              isActive("/yourBookings") ? "underline text-orange-500" : ""
            }`}
            to="/yourBookings"
          >
            Your Bookings
          </Link>
        )}

        {/* {user && user.email} */}
      </div>
    </nav>
  );
};

export default Navbar;
