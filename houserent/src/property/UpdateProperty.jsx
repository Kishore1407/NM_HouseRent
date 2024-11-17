import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../FirebaseConfig";
import { v4 } from "uuid";
import { ChevronLeft } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const CreateProperty = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [parking, setParking] = useState(false);
  const [bedRoom, setBedRoom] = useState(0);
  const [bathRoom, setBathRoom] = useState(0);
  const [area, setArea] = useState("");
  const [furnished, setFurnished] = useState(false);

  const user = useSelector((state) => state.user.user);
  console.log(user, "User redux");
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    fetchProperty();
  }, []);
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/property/findPropertyById/${id}`
      );
      console.log(response);
      console.log(response.data.message, "message");
      setTitle(response?.data?.property?.title);
      setDescription(response?.data?.property?.description);
      setAddress(response?.data?.property?.address);
      setParking(response?.data?.property?.parking);
      setIsAvailable(response?.data?.property?.isAvailable);
      setArea(response?.data?.property?.area);
      setFurnished(response?.data?.property?.furnished);
      setPrice(response?.data?.property?.price);
      setBathRoom(response?.data.property?.bathRoom);
      setBedRoom(response?.data.property?.bedRoom);
      setEmail(response?.data?.property?.email || "");
    } catch (error) {
      console.log(error);
    }
  };
  const createProperty = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/property/updatePropertyById/${id}`,
        {
          title,
          description,

          price,
          bedRoom,
          bathRoom,
          parking,
          isAvailable,
          furnished,
          area,

          address,
        }
      );
      console.log(response);
      console.log(response.data);
      fetchProperty();
      setTimeout(() => {
        toast.success("Property Updated");
      }, 300);
    } catch (error) {
      console.log(error.message);
      setTimeout(() => {
        toast.error(error.message);
      }, 300);
    }
  };
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <section className="p-3 pb-16 sm:py-20 py-10">
      <form
        className="border h-auto flex flex-col gap-7 rounded-xl shadow-lg p-3"
        onSubmit={(e) => createProperty(e)}
      >
        <div className="flex">
          <button
            onClick={back}
            type="button"
            className=" bg-white transition-all duration-500 ease-in-out hover:text-button hover:border-slate-400 hover:cursor-pointer  drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
          >
            <ChevronLeft />
            Back
          </button>
          <h1 className="text-center flex items-center  mx-auto">
            Update Property
          </h1>
        </div>
        {/* {user && user._id} */}
        <div className="flex items-center gap-2">
          <h1>Title</h1>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg border-slate-300 outline-none"
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <h1>Description</h1>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2  rounded-lg border-slate-300 outline-none"
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <h1>Address</h1>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-lg border-slate-300 p-2 outline-none"
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          <h1>Price</h1>
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 rounded-lg border-slate-300 outline-none"
            type="tel"
          />
        </div>
        <div className="flex  items-center gap-2">
          <h1>Area</h1>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border p-2 rounded-lg border-slate-300 outline-none "
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <h1>BedRoom</h1>
          <input
            value={bedRoom}
            onChange={(e) => setBedRoom(Number(e.target.value))}
            className="border p-2 rounded-lg border-slate-300 outline-none "
            type="tel"
          />
        </div>
        <div className="flex items-center  gap-2">
          <h1>BathRoom</h1>
          <input
            value={bathRoom}
            onChange={(e) => setBathRoom(Number(e.target.value))}
            className="border p-2 outline-none rounded-lg border-slate-300"
            type="tel"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 justify-between border w-1/2 rounded-lg p-3 ">
          <div className="flex items-center gap-2">
            <input
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="border p-2 rounded-lg border-slate-300 outline-none"
              type="checkbox"
            />
            <h1>Furished</h1>
          </div>
          <div className="flex items-center gap-2">
            <input
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="border p-2 rounded-lg border-slate-300  outline-none"
              type="checkbox"
            />
            <h1>Parking</h1>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="border p-2  rounded-lg border-slate-300 outline-none "
            />
            <h1>Available</h1>
          </div>
        </div>

        <button className="border items-center p-2 rounded-lg" type="submit">
          Update
        </button>
      </form>
    </section>
  );
};

export default CreateProperty;
