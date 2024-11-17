import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
const YourBookings = () => {
  const user = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBooking();
  }, []);
  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/booking/fetchBookings/${user._id}`
      );
      setBookings(response?.data?.booking);
      console.log(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div className="py-20 px-10">
      <button
        type="button"
        onClick={back}
        className=" bg-white mb-2 hover:border-slate-400 hover:cursor-pointer mr-auto drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
      >
        <ChevronLeft />
        Back
      </button>
      {/* {user._id} */}
      {/* <div>
        {bookings &&
          bookings.map((data, index) => <div key={index}>{data.user}</div>)}
      </div> */}
      <div className="border  p-3 rounded-lg">
        {bookings && bookings.length > 0 ? (
          <div className="">
            {bookings.map((data, index) => (
              <div className="border-b py-2">
                <Link
                  to={`/property/${data.property}`}
                  className="border-b py-2"
                >
                  <div>
                    <label>CheckInDate</label>
                    {data.checkInDate && data.checkInDate}
                  </div>
                  <div>
                    <label>CheckInDate</label>
                    {data.checkInDate && data.checkInDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-medium">Status - </label>
                    <p className="text-neutral-400">
                      {data.status && data.status}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className=" flex items-center mx-auto font-bold justify-center min-h-screen text-red-400">
            No Bookings Found
          </p>
        )}
      </div>
    </div>
  );
};

export default YourBookings;
