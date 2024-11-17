import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Calendar, House, IndianRupee } from "lucide-react";
const BookProperty = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [expiryYear, setExpiryYear] = useState(null);

  const { userId, propertyId, price } = useParams();
  const pricePerDay = price ? Number(price) : 0;

  useEffect(() => {
    if (checkIn && checkOut) {
      calculateTotalPrice();
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    fetchProperty();
  }, []);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/property/findPropertyById/${propertyId}`
      );
      console.log(response?.data?.message, "mesage from propertyfeth");
      setImages(response?.data?.property?.images);
      setTitle(response?.data?.property?.title);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const calculateTotalPrice = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setTotalPrice(0);
      setTimeout(() => {
        toast.error("Checkout date must be after the Check-in date");
      }, 300);
      return;
    }

    const timeDifference = checkOutDate - checkInDate;
    const days = timeDifference / (1000 * 60 * 60 * 24);

    setTotalPrice(days * pricePerDay);
  };
  const [date, setDate] = useState(Date.now());
  const payment = async (cardNumber, cvv, expiryDate, expiryYear) => {
    try {
      if (cardNumber && cvv && expiryDate && expiryYear !== null) {
        const response = await axios.post(
          "http://localhost:3500/api/booking/createBooking",
          {
            user: userId,
            property: propertyId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            status: "Confirmed",
            paymentStatus: "Paid",
          }
        );
        if (response.status === 201) {
          setTimeout(() => {
            toast.success("Payment success");
          });
        }
      } else {
        toast.error("Pease fill all fields");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error.message);
    }
  };
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return (
    <div className="p-10 pb-20">
      <div className="border rounded-lg p-2">
        {/* {price}
        {title}
        <img src={images[0]} /> */}
        {/* <p>User ID: {userId}</p> */}
        {/* <p>Property ID: {propertyId}</p> */}

        <div className="w-[400px] h-[300px] sm:h-[400px] py-2 sm:py-10 sm:w-4/6  sm:flex sm:items-center sm:mx-auto sm:justify-center">
          <img
            className="h-full w-full shadow-md object-cover rounded-lg"
            src={images[0]}
          />
        </div>
        <section className="py-2 flex flex-col gap-3">
          <h1 className="flex items-center gap-1">
            <House />
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <label>CheckIn</label>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>CheckOut</label>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="date"
              className="border rounded-lg p-2"
            />
          </div>
          <p className="flex font-medium  items-center gap-2W">
            Total Price:
            <h1 className="flex items-center">
              <IndianRupee size={15} />
              {totalPrice}
            </h1>
          </p>
          <hr className="border-neutral-400 w-full " />
        </section>
        <section className="flex flex-col gap-3">
          <h1 className="text-center font-medium text-lg  py-5 ">Payment</h1>
          <div className="flex items-center gap-2">
            <h1>Card Number</h1>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              type="tel"
              placeholder="card number"
              className="border  rounded-lg p-2 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <h1>CVV</h1>
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              S
              placeholder="cvv"
              className="border  rounded-lg p-2 outline-none"
              type="tel"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1>Expiry Date/Year</h1>
            <input
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              type="tel"
              placeholder="date"
              className="rounded-lg outline-none border p-2"
            />
            <input
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              type="tel"
              placeholder="year"
              className="rounded-lg  outline-none border p-2"
            />
          </div>
          <button
            onClick={() => payment(cardNumber, cvv, expiryDate, expiryYear)}
            className="border p-2 rounded-lg drop-shadow-sm"
          >
            Pay Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default BookProperty;
