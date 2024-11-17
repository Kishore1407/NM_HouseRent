import axios from "axios";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  House,
  IndentIncrease,
  IndianRupee,
  ParkingCircle,
  ParkingCircleOff,
} from "lucide-react";

import { Mail } from "lucide-react";
import { LandPlot } from "lucide-react";
import { CircleParking } from "lucide-react";
import { CircleParkingOff } from "lucide-react";
import { MapPin } from "lucide-react";
import { GiPaintRoller, GiRupee } from "react-icons/gi";
import { TbPaintOff } from "react-icons/tb";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);

  const search = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/property/searchProperty?searchTerm=${searchTerm}&parking=${parking}&furnished=${furnished}`
      );
      // Assuming the response has a 'propertyListing' array
      setResults(response?.data?.propertyListing || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <div className="border p-5 rounded-lg">
        <div className="p-3">
          {/* Search Input */}
          <input
            type="search"
            value={searchTerm}
            className="p-2 border outline-none rounded-lg"
            placeholder="Search for properties"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={search}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>

          <h1 className="mt-5 font-semibold">Filter</h1>

          {/* Parking Filter */}
          <div>
            <label>Parking</label>
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="ml-2"
            />
          </div>

          {/* Furnished Filter */}
          <div className="mt-2">
            <label>Furnished</label>
            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="ml-2"
            />
          </div>
        </div>

        {/* Displaying results */}
        <div className="py-10 border rounded-lg p-2">
          <h1 className="font-medium text-center py-2 text-lg">Properties</h1>
          {results.length > 0 ? (
            <ul>
              {results.map((property, index) => (
                <li key={index} className="border-b py-2">
                  <h3 className="font-bold">{property.name}</h3>
                  <div className="">
                    <img
                      className="h-[250px] w-[300px] sm:h-[400px] sm:w-[450px] rounded-lg object-cover"
                      src={property.images[0]}
                    />
                  </div>
                  <div className="flex flex-col gap-3 px-5 py-3">
                    <div className="flex justify-between">
                      <h1 className="flex items-center gap-2 flex-wrap">
                        <House />
                        {property.title && property.title}
                      </h1>
                      <p className="flex border rounded-lg p-2 shadow-md border-slate-400 items-center gap-1">
                        <IndianRupee size={16} />
                        {property.price && property.price}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-700 flex flex-wrap">
                      {property.description}
                    </p>
                    <h1 className="flex items-center gap-2">
                      <LandPlot />
                      {property.area}
                    </h1>
                    <p className="text-xs flex items-center flex-wrap gap-2">
                      <MapPin />
                      {property.address}
                    </p>

                    {property.parking ? (
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
                      <input
                        className=""
                        type="checkbox"
                        checked={isAvailable}
                      />
                      Available
                    </p> */}

                    {property.furnished ? (
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
                      href={`mailto:${results.email}`}
                      className="flex items-center gap-2"
                    >
                      <Mail /> Contact
                    </a>
                  </div>
                  {/* <p>{property.state}</p>
                  <p>{property.parking ? "Has Parking" : "No Parking"}</p>
                  <p>{property.furnished ? "Furnished" : "Not Furnished"}</p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
