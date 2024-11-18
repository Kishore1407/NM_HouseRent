import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCheck, ChevronLeft } from "lucide-react";
import {
  House,
  IndentIncrease,
  IndianRupee,
  ParkingCircle,
  ParkingCircleOff,
  Bath,
  Bed,
} from "lucide-react";

import { useSelector } from "react-redux";
import { Mail } from "lucide-react";
import { LandPlot } from "lucide-react";
import { CircleParking } from "lucide-react";
import { CircleParkingOff } from "lucide-react";
import { MapPin } from "lucide-react";
import { GiPaintRoller, GiRupee } from "react-icons/gi";
import { TbPaintOff } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { Check } from "lucide-react";
import { X } from "lucide-react";
const ViewProperty = () => {
  const { id } = useParams();
  useEffect(() => {
    fetchProperty();
  }, []);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [parking, setParking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [bedRoom, setBedRoom] = useState(0);
  const [bathRoom, setBathRoom] = useState(0);
  const [images, setImages] = useState([]);
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/property/findPropertyById/${id}`
      );
      console.log(response);
      console.log(response.data.message, "message");
      setTitle(response?.data?.property?.title);
      setDescription(response?.data?.property?.description);
      setBathRoom(response?.data?.property?.bathRoom);
      setBedRoom(response?.data?.property?.bedRoom);
      setAddress(response?.data?.property?.address);
      setParking(response?.data?.property?.parking);
      setIsAvailable(response?.data?.property?.isAvailable);
      setArea(response?.data?.property?.area);
      setFurnished(response?.data?.property?.furnished);
      setPrice(response?.data?.property?.price);
      setImages(response?.data?.property?.images);
      setEmail(response?.data?.property?.email || "");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const user = useSelector((state) => state.user.user);
  const login = () => {
    setTimeout(() => {
      toast.error("Please login to Book");
    }, 300);
  };
  return (
    <div className="w-full ">
      {/* ViewProperty{id} */}
      {/* {title} */}
      <div className="w-full sm:h-[500px] h-[400px] relative ">
        <img
          src={images[0]}
          className="w-full h-full object-cover  rounded-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black  opacity-30 via-transparent to-transparent rounded-md" />
        <div className="absolute inset-0 bg-gradient-to-br from-black  opacity-30 via-transparent to-transparent rounded-md" />
        {/* <div className="absolute left-0 "> */}
        <button
          onClick={back}
          className=" bg-white hover:cursor-pointer m-2 drop-shadow-xl gap-1 border text-orange-400 flex items-center p-2 rounded-lg left-0 absolute top-0  "
        >
          <ChevronLeft />
          Back
        </button>
      </div>
      <div className="flex w-full -mt-14 sm:-mt-20  h-full bg-white rounded-t-3xl sm:rounded-t-[30px] border-t-2 absolute   border-slate-400 flex-col gap-4">
        <div className="flex flex-col gap-3 px-5 py-3">
          <div className="flex justify-between">
            <h1 className="flex items-center gap-2 flex-wrap">
              <House />
              {title}
            </h1>
            <p className="flex items-center gap-1">
              <IndianRupee size={16} />
              {price}
            </p>
          </div>

          <p className="text-xs text-neutral-700 flex flex-wrap">
            {description}
          </p>
          <h1 className="flex items-center gap-2">
            <LandPlot />
            {area} Sqft
          </h1>
          <p className="text-xs flex items-center flex-wrap gap-2">
            <MapPin />
            {address}
          </p>
          <p className=" flex items-center flex-wrap gap-2">
            <Bed />
            {bedRoom}
          </p>
          <p className=" flex items-center  gap-2">
            <Bath />
            {bathRoom}
          </p>

          {parking ? (
            <>
              {" "}
              <p className="flex items-center gap-3">
                <ParkingCircle />
                Parking
              </p>
            </>
          ) : (
            <p className="flex items-center gap-3">
              <ParkingCircleOff /> No Parking
            </p>
          )}
          {/* <p className="flex items-center mr-auto gap-3">
            <input className="" type="checkbox" checked={isAvailable} />
            Available
          </p> */}
          {isAvailable ? (
            <p className="flex items-center gap-3">
              <Check />
              Available
            </p>
          ) : (
            <p className="flex items-center gap-3">
              <X /> Not Available
            </p>
          )}
          {furnished ? (
            <p className="flex items-center gap-3">
              <GiPaintRoller />
              Furnished
            </p>
          ) : (
            <p className="flex items-center gap-3">
              <TbPaintOff /> Not Furnished
            </p>
          )}
          <a
            href={`mailto:${email}`}
            className="flex outline-none  text-decoration-none items-center gap-2"
          >
            <Mail /> Contact
          </a>
          {user && user._id ? (
            <Link to={`/bookProperty/${user._id}/${id}/${price}`}>
              Book Now
            </Link>
          ) : (
            <button onClick={login}>Book Now</button>
          )}
          <form></form>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;
