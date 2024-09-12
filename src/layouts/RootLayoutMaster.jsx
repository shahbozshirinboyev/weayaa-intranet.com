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
      navLink: "/"
    },
    {
      title: "Staff",
      src: "bi bi-people",
      navLink: "/staffs",
      gap: true,
    },
    {
      title: "Projects",
      src: "bi bi-folder",
      navLink: "/projects",
    },
    {
      title: "Status",
      src: "bi bi-pie-chart",
      navLink: "/status",
    },
    {
      title: "Settings",
      src: "bi bi-gear",
      navLink: "/settings",
      gap: true,
    },
    {
      title: "Logout",
      src: "bi bi-box-arrow-right",
      navLink: "/logout",
    },
  ];
  return (
    <>
      <div className="flex">
        {/* Sidebar START */}
        <div className={`${ open ? "w-[250px]" : "w-[80px]"} fixed bg-custom-green-5 h-screen p-5 pt-7 duration-300`}>
          {/* Button Sidebar width change start */}
          <div className={`absolute cursor-pointer -right-3 top-[50px] ${ !open && "rotate-180" }`} onClick={() => setOpen(!open)}>
            <i className="bi bi-arrow-left-circle w-7 text-[28px] text-custom-green-60 hover:text-custom-green-dark ease-in-out transition-all"></i>
          </div>
          {/* Button Sidebar width change start */}
          {/* Sidebar LOGO start */}
          <div className="flex gap-x-4 items-center">
            <img src={logo} className={`w-[40px] h-auto duration-75 ${ open && "scale-0 hidden" }`} />
            <img src={logoLong} className={`duration-75 ${!open && "scale-0 hidden"}`} />
          </div>
          {/* Sidebar LOGO end */}
          <ul className="pt-6">
            {/* Menu name start */}
            <div className="text-custom-green-dark font-semibold text-[14px] text-left">
              <p>Menu</p>
            </div>
            {/* Menu name end */}
            {/* Menu list START */}
            {Menus.map((Menu, index) => 
            (
              <li key={index} className={`${Menu.gap ? "mt-9" : "mt-2"}`}>
                <NavLink to={Menu.navLink} className={({ isActive }) => `${isActive ? "bg-custom-green-dark text-white" : "bg-custom-green-30 text-custom-green-dark"} flex rounded-[10px] p-2 cursor-pointer hover:bg-custom-green-dark hover:text-white font-semibold text-sm items-center gap-x-4 transition-all duration-200`}>
                    {/* ${index === 0 && "bg-custom-green-dark text-white"} */}
                    <i className={`${Menu.src} text-[20px] mx-[2px]`}></i>
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                </NavLink>
              </li>
            ))}
            {/* Menu list END */}
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
