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
    <div className="container py-20">
      <div className="card p-4">
        <div className="mb-3">
      
          <div className="input-group">
            <input
              type="search"
              value={searchTerm}
              className="form-control"
              placeholder="Search for properties"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={search} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

        <h5 className="mt-4">Filter</h5>

      
        <div className="form-check item-center flex mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="parkingFilter"
            checked={parking}
            onChange={(e) => setParking(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="parkingFilter">
            Parking
          </label>
        </div>

        {/* Furnished Filter */}
        <div className="form-check mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="furnishedFilter"
            checked={furnished}
            onChange={(e) => setFurnished(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="furnishedFilter">
            Furnished
          </label>
        </div>

        {/* Displaying results */}
        <div className="mt-5">
          <h5 className="text-center">Properties</h5>
          {results.length > 0 ? (
            <ul className="list-group">
              {results.map((property, index) => (
                <li
                  key={index}
                  className="list-group-item mb-3 border rounded shadow-sm"
                >
                  <h6 className="mb-3">{property.title}</h6>
                  <div className="mb-3">
                    <img
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px", maxWidth: "100%" }}
                      src={property.images[0]}
                      alt={property.title}
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <House className="me-2" />
                      {property.title}
                    </div>
                    <div className="badge bg-primary text-white">
                      <IndianRupee className="me-1" size={16} />
                      {property.price}
                    </div>
                  </div>
                  <p className="small text-muted">{property.description}</p>
                  <div className="mb-2">
                    <LandPlot className="me-2" />
                    {property.area}
                  </div>
                  <div className="mb-2">
                    <MapPin className="me-2" />
                    {property.address}
                  </div>
                  <div className="mb-2">
                    {property.parking ? (
                      <div>
                        <ParkingCircle className="me-2" />
                        Parking
                      </div>
                    ) : (
                      <div>
                        <ParkingCircleOff className="me-2" />
                        No Parking
                      </div>
                    )}
                  </div>
                  <div className="mb-2">
                    {property.furnished ? (
                      <div>
                        <GiPaintRoller className="me-2" />
                        Furnished
                      </div>
                    ) : (
                      <div>
                        <TbPaintOff className="me-2" />
                        Not Furnished
                      </div>
                    )}
                  </div>
                  <a
                    href={`mailto:${property.email}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <Mail className="me-1" />
                    Contact
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No properties found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
