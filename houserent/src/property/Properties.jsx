import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomePage from "../assets/HomePage.png";
import Home from "../assets/HouseLogo.png";
import { IndianRupee } from "lucide-react";
import { BsHouse } from "react-icons/bs";
const Properties = () => {
  const [property, setProperty] = useState([]);
  useEffect(() => {
    fetchProperty();
  }, []);
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/property/fetchAllProperty"
      );
      console.log(response);
      console.log(response.data);
      setProperty(response?.data?.property);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Properties */}
      {/* <div className="relative  w-full h-screen ">
        <img
          className="w-full h-full object-cover  py-2 rounded-lg p-1"
          src={HomePage}
          alt="homepage"
        />
      </div> */}
      <div className="sm:p-10 sm:py-16 px-5">
        <div className="  hidden relative sm:flex  w-full  h-[500px] overflow-hidden  relative">
          <img
            className=" hover:scale-100 w-full rounded-3xl shadow-lg h-full  object-cover"
            src={Home}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black w-24 opacity-80 via-transparent to-transparent rounded-md" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black  opacity-30 via-transparent to-transparent rounded-md" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black  opacity-30 via-transparent to-transparent rounded-md" />
          <div className="absolute inset-0 bg-gradient-to-bl from-black  opacity-30 via-transparent to-transparent rounded-md" />
        </div>
        {/* <div className="sm:flex hidden absolute  p-2 inset-0 items-center justify-center">
          <input type="text" className=" rounded-lg outline-none p-3" />
          <label>Search</label>
        </div> */}
      </div>
      <div className="px-5">
        <h1 className="font-medium hidden sm:flex  text-lg ">
          Explore Properties
        </h1>
      </div>
      <section className="py-10 flex flex-wrap gap-4">
        {property.length > 0 &&
          property.map((data, index) => (
            <div key={index} className="w-full hover:scale-105 transition-all duration-500 ease-in-out sm:w-1/2 lg:w-1/3 mb-4  px-5  ">
              <Link
                className="flex flex-col shadow-lg rounded-2xl  border p-2 "
                to={`/property/${data._id}`}
              >
                {/* {data._id} */}
                <div className="w-full mb-2">
                  <img
                    src={data.images[0]}
                    className="object-cover rounded-lg"
                    alt="images"
                  />
                </div>
                <div className="flex flex-col text-neutral-500 gap-1 py-1 px-2">
                  <h1 className=" flex  items-center gap-2">
                    <BsHouse className="text-orange-400" />
                    {data.title}
                  </h1>
                  <p className="flex items-center">
                    <IndianRupee className="text-orange-500" size={15} />
                    {data.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Properties;
