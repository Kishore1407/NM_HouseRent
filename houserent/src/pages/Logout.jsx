import React from "react";

const Logout = () => {
  const log = () => {
    try {
      // localStorage.removeItem("JWTToken");
      // localStorage.removeItem("isAdmin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={log}>Logout</button>
    </div>
  );
};

export default Logout;
