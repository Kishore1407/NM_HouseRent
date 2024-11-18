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
      <div className="container py-4">
        <div className="d-none d-sm-block position-relative rounded overflow-hidden">
          <img
            className="img-fluid w-100 rounded shadow-lg"
            src={Home}
            alt="Home"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient bg-opacity-80"></div>
        </div>
      </div>

      <div className="container mt-4">
        <h1 className="d-none d-sm-block fw-medium fs-5">Explore Properties</h1>
      </div>

      <div className="container py-4">
        <div className="row gy-4">
          {property.length > 0 &&
            property.map((data, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4">
                <Link
                  className="text-decoration-none text-dark d-flex flex-column shadow-lg rounded border p-2"
                  to={`/property/${data._id}`}
                >
                  <div className="mb-2">
                    <img
                      src={data.images[0]}
                      className="img-fluid rounded"
                      alt="Property"
                    />
                  </div>

                  <div className="d-flex flex-column text-muted gap-1 py-1 px-2">
                    <h1 className="d-flex align-items-center gap-2">
                      <BsHouse className="text-warning" />
                      {data.title}
                    </h1>
                    <p className="d-flex align-items-center">
                      <IndianRupee className="text-warning" size={15} />
                      {data.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
