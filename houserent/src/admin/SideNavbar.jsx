import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SideNavbar = ({ onViewChange }) => {
  const [sideNav, setSideNav] = useState(false);
  const navView = () => {
    setSideNav(!sideNav);
  };

  const navItems = [
    { title: "Users", view: "Users" },
    { title: "Properties", view: "Properties" },
    { title: "Owners", view: "Owners" },
    { title: "Bookings", view: "Bookings" },
  ];

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="sm:flex hidden w-1/4 h-screen border-r-2 flex-col gap-10">
        {navItems.map((item) => (
          <div
            key={item.view}
            className="flex items-center justify-center w-full py-5 border-b-2 cursor-pointer"
            onClick={() => onViewChange(item.view)}
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Mobile Navbar */}
      <div className="flex sm:hidden">
        <div
          className={`flex ${
            sideNav ? "w-1/4 border-r-2" : ""
          } h-screen flex-col gap-10`}
        >
          {sideNav ? (
            <button onClick={navView} className="mr-auto cursor-pointer">
              <X />
            </button>
          ) : (
            <button className="mr-auto flex left-0" onClick={navView}>
              <Menu />
            </button>
          )}
          {sideNav && (
            <>
              {navItems.map((item) => (
                <div
                  key={item.view}
                  className="flex items-center justify-center w-full py-5 border-b-2 cursor-pointer"
                  onClick={() => {
                    onViewChange(item.view);
                    navView();
                  }}
                >
                  <p>{item.title}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <div className={` ${sideNav ? "w-3/4" : "w-full"} flex justify-center`}>
          <h1>Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
