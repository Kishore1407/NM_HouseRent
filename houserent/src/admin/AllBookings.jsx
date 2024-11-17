import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
const Users = () => {
  useEffect(() => {
    fetchAllBookings();
  }, []);
  const [bookings, setBookings] = useState([]);
  const fetchAllBookings = async () => {
    const response = await axios.get(
      "http://localhost:3500/api/admin/fetchBookings"
    );
    console.log(response?.data?.message);
    setBookings(response?.data?.bookings);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-14 sm:pl-44 md:pl-52 lg:pl-72">
      <Dashboard />{" "}
      <div className="p-3 sm:py-16  sm:w-full">
        <h1 className="text-center flex text-lg mx-auto justify-center gap-3">
          <span className="p-1 border border-neutral-100 shadow-sm rounded-lg">
            <User size={14} className="text-[#FF5F5F]" />
          </span>{" "}
          All Bookings
        </h1>

        {bookings &&
          bookings.map((data, index) => (
            <div
              className="border  rounded-lg p-3 flex flex-col gap-3 py-2"
              key={index}
            >
              <h1 className="flex items-center gap-1">
                CheckInDate:
                <p className="text-neutral-600">
                  {data.checkInDate && data.checkInDate}
                </p>
              </h1>
              <h1 className="flex items-center gap-1">
                CheckoutDate:
                <p className="text-neutral-600">
                  {data.checkOutDate && data.checkOutDate}
                </p>
              </h1>
              <h1 className="flex items-center gap-1">
                Status:
                <p className="text-neutral-600">{data.status && data.status}</p>
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
