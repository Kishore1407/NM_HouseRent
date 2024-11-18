import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee, ChevronLeft } from "lucide-react";
import { BsHouse } from "react-icons/bs";
import { useSelector } from "react-redux";

const Properties = () => {
  const [property, setProperty] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/user/fetchUserProperty",
        {
          email: user.email,
        }
      );
      console.log(response);
      console.log(response.data);
      setProperty(response?.data?.property || []);
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    navigate(-1); // Go back in history
  };

  return (
    <div>
      
      <div className="d-flex px-3 py-2 border-bottom position-fixed top-0 w-100 bg-white align-items-center gap-2 z-10">
        <button
          type="button"
          onClick={back}
          className=" d-flex border align-items-center gap-1"
        >
          <ChevronLeft /> Back
        </button>
        <h1 className="mb-0 text-secondary fs-5">Your Properties</h1>
      </div>

      <section className="pt-5 mt-5 d-flex flex-wrap gap-3">
        {property.length > 0 ? (
          <>
            {property.map((data, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3 px-3">
                <Link
                  to={`/updateProperty/${data._id}`}
                  className="card shadow border-0 h-100 text-decoration-none text-dark"
                >
                  <img
                    src={data.images[0]}
                    className="card-img-top rounded"
                    alt="property"
                  />
                  <div className="card-body">
                    <h5 className="card-title d-flex align-items-center gap-2 text-primary">
                      <BsHouse className="text-warning" /> {data.title}
                    </h5>
                    <p className="card-text d-flex align-items-center gap-1 text-success">
                      <IndianRupee size={15} /> {data.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p
            className="d-flex justify-content-center align-items-center w-100 text-danger fw-bold"
            style={{ minHeight: "50vh" }}
          >
            No Property found
          </p>
        )}
      </section>
    </div>
  );
};

export default Properties;
