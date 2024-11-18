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
    <div className="my-10 px-4">

      <button
        type="button"
        onClick={back}
        className="btn mt-12  mb-3 d-flex align-items-center gap-2"
      >
        <ChevronLeft /> Back
      </button>

      
      <div className="card p-3 rounded">
        {bookings && bookings.length > 0 ? (
          <div>
            {bookings.map((data, index) => (
              <div key={index} className="border-bottom py-3">
                <Link
                  to={`/property/${data.property}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="mb-2">
                    <label className="fw-bold">Check-In Date:</label>{" "}
                    {data.checkInDate && data.checkInDate}
                  </div>
                  <div className="mb-2">
                    <label className="fw-bold">Check-Out Date:</label>{" "}
                    {data.checkOutDate && data.checkOutDate}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <label className="fw-bold">Status:</label>
                    <p className="text-muted mb-0">
                      {data.status && data.status}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="d-flex justify-content-center align-items-center text-danger fw-bold"
            style={{ minHeight: "50vh" }}
          >
            No Bookings Found
          </p>
        )}
      </div>
    </div>
  );
};

export default YourBookings;
