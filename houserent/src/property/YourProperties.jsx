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
      <div className="px-5 border-b  fixed top-0 items-center gap-3 flex sm:hidden bg-white z-10 py-3 w-full">
        <button
          type="button"
          onClick={back}
          className="bg-white hover:border-slate-400 cursor-pointer  drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg"
        >
          <ChevronLeft />
          Back
        </button>
        <h1 className="font-medium text-slate-500 text-lg">Your Properties</h1>
      </div>

      <section className="py-16 sm:py-24 flex flex-wrap gap-4">
       

        {property.length > 0 ? (
          <>
            {property.map((data, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 mb-4 px-5">
                <Link
                  className="flex flex-col shadow-lg rounded-2xl border p-2"
                  to={`/updateProperty/${data._id}`}
                >
                  <div className="w-full mb-2">
                    <img
                      src={data.images[0]}
                      className="object-cover rounded-lg"
                      alt="property"
                    />
                  </div>
                  <div className="flex flex-col text-neutral-500 gap-1 py-1 px-2">
                    <h1 className="flex items-center gap-2">
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
          </>
        ) : (
          <p className=" flex items-center mx-auto font-bold justify-center min-h-screen text-red-400">
            No Property found
          </p>
        )}
      </section>
    </div>
  );
};

export default Properties;
