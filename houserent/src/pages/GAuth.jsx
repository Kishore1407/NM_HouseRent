import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../FirebaseConfig";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store/slices/userSlice";
const GAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const email = result.user.email;
      // const userName=result.user.displayName
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/googleAuth`,
        {
          email,
        }
      );
      console.log(response?.data?.user?.email, "email from auth");
      console.log(response?.data?.user?._id, "email from auth");
      dispatch(
        logIn({
          email: response.data?.user?.email,
          _id: response.data?.user?._id,
          token: response?.data?.token,
          isAdmin:response.data?.user?.isAdmin
        })
      );
      setTimeout(() => {
        toast.success("Google Auth Success");
      }, 300);

      setTimeout(() => {
        navigate("/");
      }, 500);
      console.log(response);
      console.log(response.data.message);

      console.log(response?.data?.user?.isAdmin, "admin Status");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center  mx-auto">
      <button
        onClick={GoogleAuth}
        className="border flex items-center gap-2 p-2 text-sm rounded-lg"
      >
        <FaGoogle className="text-yellow-400" /> Login with Google
      </button>
    </div>
  );
};

export default GAuth;
