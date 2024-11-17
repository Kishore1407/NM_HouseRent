import Dashboard from "./Dashboard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IndianRupee } from "lucide-react";
import { BsHouse } from "react-icons/bs";
const AllProperties = () => {
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
      <Dashboard />
      <div className="py-20 sm:pl-32 md:pl-60 lg:pl-72 sm:w-full ">
        <section className="py-10 flex flex-wrap gap-4 sm:w-full">
          {property.length > 0 &&
            property.map((data, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 mb-4  px-5  "
              >
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
    </div>
  );
};

export default AllProperties;
