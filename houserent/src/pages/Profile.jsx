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
    <section className="p-5 py-10 sm:py-20">
      <form
        className="border sm:text-lg flex flex-col gap-3 sm:gap-5 md:gap-7 rounded-lg shadow-md p-5"
        onSubmit={(e) => updateUser(e)}
      >
        {/* {email}email Profile{user && user.email} */}
        <button
          type="button"
          onClick={back}
          className=" bg-white hover:border-slate-400 hover:cursor-pointer mr-auto drop-shadow-sm gap-1 border text-orange-400 flex items-center p-1 px-2 rounded-lg  "
        >
          <ChevronLeft />
          Back
        </button>
        <h1 className="font-medium text-lg p-5 text-center ">Profile</h1>
        <div className="flex gap-2 items-center ">
          <label>Email</label>
          <input
            type="email"
            disabled={true}
            className="border rounded-lg p-2"
            value={email}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <label>UserName</label>
          <input
            type="text"
            value={userName}
            className="border outline-none rounded-lg p-2"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <label>Address</label>
          <input
            type="text"
            value={address}
            className="border outline-none rounded-lg p-2"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <label>Pincode</label>
          <input
            type="tel"
            value={pinCode}
            className="border outline-none rounded-lg p-2"
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center ">
          <label>MobileNo</label>
          <input
            type="tel"
            value={mobileNo}
            className="border outline-none rounded-lg p-2"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex gap-2 items-center ">
            <label>State</label>
            <input
              type="text"
              value={state}
              className="border outline-none rounded-lg p-2"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center ">
            <label>Country</label>
            <input
              type="text"
              value={country}
              className="border outline-none rounded-lg p-2"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="rounded-lg shadow-md p-2 border">
            Update
          </button>
        </div>
        <div className="py-3 flex items-center gap-3 sm:hidden">
          <button
            onClick={() => signOut()}
            className="rounded-lg shadow-md p-2 border"
          >
            Logout
          </button>
          <button className="rounded-lg shadow-md p-2 border">
            Delete Account
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
