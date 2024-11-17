import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../FirebaseConfig";
import { v4 } from "uuid";
import { ChevronLeft } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
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
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const user = useSelector((state) => state.user.user);
  console.log(user, "User redux");
  const createProperty = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/property/createProperty`,
        {
          email: user?.email,
          title,
          description,
          price,
          bedRoom,
          bathRoom,
          parking,
          isAvailable,
          furnished,
          area,
          images,
          address,
          propertyType,
          owner: user._id,
        }
      );
      console.log(response);
      console.log(response.data);
      setTimeout(() => {
        toast.success("Property Created");
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
  const imageUpload = async (e) => {
    try {
      e.preventDefault();
      const imageRef = ref(storage, `image/${v4()}`);
      await uploadBytes(imageRef, image);
      const images = await getDownloadURL(imageRef);
      console.log(images, "image from firebase");
      setImages((prev) => [...prev, images]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage = (id) => {
    const delteImages = images.filter((data) => data != id);
    setImages(delteImages);
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
            className=" bg-white hover:border-slate-400 hover:cursor-pointer  drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
          >
            <ChevronLeft />
            Back
          </button>
          <h1 className="text-center flex items-center  mx-auto">
            Create Property
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
          <h1>Property Type</h1>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="border p-2 rounded-lg border-slate-300 outline-none"
          >
            <option value="">Select a Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Villa">Villa</option>
            <option value="Other">Other</option>
          </select>
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

        <div>
          <h1>Images</h1>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={(e) => imageUpload(e)} type="button">
            Upload
          </button>
        </div>
        {images &&
          images.map((data, index) => (
            <div className="w-16 h-16 flex items-center " key={index}>
              <img src={data} alt="imgage" className="object-cover" />
              <button onClick={(e) => deleteImage(data)}>Delete</button>
            </div>
          ))}
        <button className="border items-center p-2 rounded-lg" type="submit">
          Create
        </button>
      </form>
    </section>
  );
};

export default CreateProperty;
