import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

// img logo
import logo from "../../public/img/logo.png";
import logoLong from "../../public/img/logo_long.png";

// Date - Luxon
import { DateTime } from "luxon";

function RootLayoutMaster() {
  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("d MMMM yyyy");

  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Dashboard",
      src: "bi bi-columns-gap",
    },
    {
      title: "Staff",
      src: "bi bi-people",
      gap: true,
    },
    {
      title: "Projects",
      src: "bi bi-folder",
    },
    {
      title: "Status",
      src: "bi bi-pie-chart",
    },
    {
      title: "Settings",
      src: "bi bi-gear",
      gap: true,
    },
    {
      title: "Logout",
      src: "bi bi-box-arrow-right",
    },
  ];

  return (
    <>
      <div className="flex">
        {/* Sidebar START */}
        <div
          className={`${
            open ? "w-[250px]" : "w-[80px]"
          } bg-custom-green-5 h-screen p-5 pt-7 duration-300 fixed`}
        >
          <div
            className={`absolute cursor-pointer -right-3 top-[50px] ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          >
            <i className="bi bi-arrow-left-circle w-7 text-[28px] text-custom-green-60 hover:text-custom-green-dark ease-in-out transition-all"></i>
          </div>

          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              className={`w-[40px] h-auto duration-75 ${
                open && "scale-0 hidden"
              }`}
            />
            <img
              src={logoLong}
              className={`duration-75 ${!open && "scale-0 hidden"}`}
            />
          </div>

          <ul className="pt-6">
            <div className="text-custom-green-dark font-semibold text-[14px] text-left">
              <p>Menu</p>
            </div>

            <div>
              <div></div>
              <div></div>
            </div>

            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-[10px] p-2 cursor-pointer bg-custom-green-30 hover:bg-custom-green-dark hover:text-white text-custom-green-dark font-semibold text-sm items-center  gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-custom-green-dark text-white"
                }`}
              >
                <i className={`${Menu.src} text-[20px] mx-[2px]`}></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Sidebar END */}

        <div className={`flex-1 p-7 ${ open ? "ml-[250px]" : "ml-[80px]" } transition-all duration-300`}>
          {/* Navbar START */}
          <div className="bg-custom-green-5 h-[60px] w-full rounded-[15px] flex mb-[20px]">
            <div className="h-full w-full flex items-center mx-[10px]">
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-calendar2-week font-medium"></i>
                <p className="ml-[10px]">{formattedDate}</p>
              </div>
            </div>

            <div className="flex justify-end items-center w-full">
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-bell font-medium"></i>
              </div>
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-person font-medium"></i>
              </div>
            </div>
          </div>
          {/* Navbar END */}

          {/* Content START */}
          <main>
            <Outlet />
          </main>
          {/* Content END */}
        </div>

      </div>
    </>
  );
}

export default RootLayoutMaster;
