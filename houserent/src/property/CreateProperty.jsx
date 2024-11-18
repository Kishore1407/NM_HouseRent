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
    <section className="container py-5">
      <form
        className="card p-4 shadow rounded"
        onSubmit={(e) => createProperty(e)}
      >
        <div className="d-flex  items-center gap-3 mb-3">
          <button
            onClick={back}
            className="flex items-center "
            type="button"
          >
            <ChevronLeft /> Back
          </button>
          <h1 className="text-center flex mx-auto text-lg"  >Create Property</h1>
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="form-select"
          >
            <option value="">Select a Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Villa">Villa</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="form-control"
            type="number"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Area</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input
            value={bedRoom}
            onChange={(e) => setBedRoom(Number(e.target.value))}
            className="form-control"
            type="number"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input
            value={bathRoom}
            onChange={(e) => setBathRoom(Number(e.target.value))}
            className="form-control"
            type="number"
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="form-check">
              <input
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                id="furnished"
              />
              <label className="form-check-label" htmlFor="furnished">
                Furnished
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                id="parking"
              />
              <label className="form-check-label" htmlFor="parking">
                Parking
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                id="available"
              />
              <label className="form-check-label" htmlFor="available">
                Available
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            onClick={(e) => imageUpload(e)}
            type="button"
            className="btn btn-primary mt-2"
          >
            Upload
          </button>
        </div>

        {images &&
          images.map((data, index) => (
            <div className="d-flex align-items-center mb-2" key={index}>
              <img
                src={data}
                alt="image"
                className="img-thumbnail me-2"
                style={{ width: "75px", height: "75px" }}
              />
              <button
                onClick={(e) => deleteImage(data)}
                type="button"
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          ))}

        <button type="submit" className="btn btn-success w-100">
          Create
        </button>
      </form>
    </section>
  );
};

export default CreateProperty;
