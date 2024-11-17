import React, { useState } from "react";
import Users from "./Users";
import SideNavbar from "./SideNavbar";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
// import Users from "./Users";
const Dashboard = () => {
  // const [view, setView] = useState(false);
  const [view, setView] = useState("Users");
  // const user = () => {
  //   setView(!view);
  // };
  const handleViewChange = (newView) => {
    setView(newView);
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div>
      {/* <section className="hidden sm:flex fixed top-0 w-full border-b bg-white py-3">
        <h1 className="flex items-center justify-center">Admin Dashboard</h1>
      </section> */}
      {/* Dashboard */}
      {/* <button onClick={user}>{view ? <p>vclose</p> : <p>view Users</p>}</button>
      {view && <Users />} */}
      {/* <Users /> */}
      {/* <section className="sm:pt-11">
        <SideNavbar onViewChange={handleViewChange} />
      </section> */}

      <section className="top-0 sm:hidden overflow-x-auto fixed border-b py-3 w-full bg-white flex items-center ">
        <div className="flex items-center gap-3 mr-auto px-3">
          <button
            type="button"
            onClick={back}
            className=" bg-white ml-2 hover:border-slate-400 hover:cursor-pointer mr-auto drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
          >
            <ChevronLeft />
            Back
          </button>
          <Link className="" to="/admin/dashboard">
            Dashboard
          </Link>
        </div>

        <div className="flex  w-full whitespace-nowrap overflow-x-auto gap-2 items-center">
          <Link
            className="border p-2 hover:underline rounded-lg"
            to="/admin/dashboard/users"
          >
            Users
          </Link>
          <Link
            className="border  hover:underline   p-2 rounded-lg"
            to="/admin/dashboard/properties"
          >
            All Property
          </Link>
          <Link
            className="border p-2  hover:underline flex flex-nowrap rounded-lg"
            to="/admin/dashboard/allBookings"
          >
            Bookings
          </Link>
          {/* <Link
            className="border hover:underline p-2 rounded-lg"
            to="/admin/dashboard/properties"
          >
            All Property
          </Link> */}
        </div>
      </section>

      {/* desktop */}
      <section className=" left-0 hidden w-1/5 py-16 sm:flex sm:flex-col overflow-x-auto fixed border-b   bg-white  items-center ">
        <div className="flex items-center gap-3 mr-auto px-3">
          <button
            type="button"
            onClick={back}
            className=" bg-white ml-2 hover:border-slate-400 hover:cursor-pointer mr-auto drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
          >
            <ChevronLeft />
            Back
          </button>
          {/* <Link className="" to="/admin/dashboard">
            Dashboard
          </Link> */}
        </div>

        <div className="flex   flex-col border-r h-screen border-r-slate-400 w-full whitespace-nowrap overflow-x-auto gap-10 items-center">
          <Link
            className=" p-2 border-b w-full  items-center flex justify-center hover:underline rounded-lg"
            to="/admin/dashboard/users"
          >
            Users
          </Link>
          <Link
            className="border-b w-full  items-center flex justify-center  hover:underline   p-2 rounded-lg"
            to="/admin/dashboard/properties"
          >
            All Property
          </Link>
          <Link
            className="border-b w-full  items-center flex justify-center p-2  hover:underline flex flex-nowrap rounded-lg"
            to="/admin/dashboard/allBookings"
          >
            All Bookings
          </Link>
          {/* <Link
            className="border-b w-full  items-center flex justify-center hover:underline p-2 rounded-lg"
            to="/admin/dashboard/properties"
          >
            All Property
          </Link> */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
