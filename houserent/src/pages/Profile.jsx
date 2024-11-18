import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    fetchUser();
  }, []);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userName, setUserName] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/user/fetchUser",
        {
          email: user.email,
        }
      );
      setUserName(response?.data?.user?.userName || "");
      setCountry(response?.data?.user?.country || "");
      setPinCode(response?.data?.user?.pinCode || "");
      setAddress(response?.data?.user?.address || "");
      setMobileNo(response?.data?.user?.mobileNo || "");
      setState(response?.data?.user?.state || "");
      setEmail(response?.data?.user?.email || user.email);
      console.log(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/user/updateProfile`,
        {
          email: user.email,

          address,
          state,
          country,
          mobileNo,
          pinCode,
          userName,
        }
      );
      console.log(response?.data?.message);

      fetchUser();
      setTimeout(() => {
        toast.success(response?.data?.message);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(response?.data?.message || "Internal server error");
    }
  };
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logOut());
    setTimeout(() => {
      toast.success("Logout success");
    }, 300);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <section className="container py-5">
      <form className="card p-4 shadow rounded" onSubmit={(e) => updateUser(e)}>
        <button
          type="button"
          onClick={back}
          className="border rounded-lg p-2 flex items-center  mb-3"
        >
          <ChevronLeft /> Back
        </button>

        <h1 className="text-center mb-4">Profile</h1>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" disabled className="form-control" value={email} />
        </div>

        <div className="mb-3">
          <label className="form-label">UserName</label>
          <input
            type="text"
            value={userName}
            className="form-control"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            value={address}
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="tel"
            value={pinCode}
            className="form-control"
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">MobileNo</label>
          <input
            type="tel"
            value={mobileNo}
            className="form-control"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              value={state}
              className="form-control"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              value={country}
              className="form-control"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Update
          </button>
        </div>

        <div className="d-flex gap-2 justify-content-between d-md-none">
          <button onClick={() => signOut()} className="btn btn-secondary w-50">
            Logout
          </button>
          <button className="btn btn-danger w-50">Delete Account</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
