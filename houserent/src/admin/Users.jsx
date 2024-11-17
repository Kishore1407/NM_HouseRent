import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
const Users = () => {
  useEffect(() => {
    users();
  }, []);
  const [userData, setUserData] = useState([]);
  const users = async () => {
    const response = await axios.get(
      "http://localhost:3500/api/admin/getAllUsers"
    );
    console.log(response?.data?.user);
    setUserData(response?.data?.user);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-14 sm:pl-44 md:pl-52 lg:pl-72">
      <Dashboard />{" "}
      <div className="p-3  sm:w-full">
        <h1 className="text-center flex text-lg mx-auto justify-center gap-3">
          <span className="p-1 border border-neutral-100 shadow-sm rounded-lg">
            <User size={14} className="text-[#FF5F5F]" />
          </span>{" "}
          Users
        </h1>

        {userData &&
          userData.map((data, index) => (
            <div
              className="border rounded-lg p-3 flex flex-col gap-3 py-2"
              key={index}
            >
              <h1 className="flex items-center gap-1">
                Email:<p className="text-neutral-600">{data.email}</p>
              </h1>
              <h1 className="flex items-center gap-1">
                Name:
                <p className="text-neutral-600">
                  {data.userName && data.userName}
                </p>
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
