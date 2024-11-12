import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// img logo
import logo from "../../public/img/logo.png";
import logoLong from "../../public/img/logo_long.png";

// Date - Luxon
import { DateTime } from "luxon";
import http from "../services/http";

function RootLayoutMaster({ setAccess, setRefresh, setUserType }) {
  // Logout section start
  const navigate = useNavigate();
  const deleteUserInfo = () => {
    toast("You are logged out!", { icon: "✌️" });
    setAccess(null);
    setRefresh(null);
    setUserType(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userType");
    localStorage.removeItem("activeProject");
    localStorage.removeItem("userId");
    navigate("/");
  };
  // Logout section end

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const userType = capitalizeFirstLetter(localStorage.getItem("userType"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [image, setImage] = useState("");

  http
    .get("users/profile/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    })
    .then((r) => {
      setFirstName(r.data.first_name);
      setLastName(r.data.last_name);
      setSpeciality(r.data.speciality);
      setImage(r.data.image);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        http
          .post("token/refresh/", {
            refresh: localStorage.getItem("refresh"),
          })
          .then((newtoken) => {
            localStorage.setItem("access", newtoken.data.access);
            console.log("Token yangilandi");
          })
          .catch(() => {
            toast.error("Yangi 'token' olib bo'lmadi :(");
          });
      } else {
        console.log(error.response.data);
        toast.error("Something went wrong :(");
      }
    });

  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("d MMMM yyyy");

  const [open, setOpen] = useState(false);

  const Menus = [
    {
      title: "Dashboard",
      src: "bi bi-columns-gap",
      navLink: "/",
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
  ];
  return (
    <>
      <div className="flex">
        {/* Sidebar START */}
        <div
          className={`${
            open ? "w-[250px]" : "w-[80px]"
          } fixed bg-custom-green-5 h-screen shadow-md duration-300 z-[99999]`}
        >
          <div className="h-screen w-full p-5 pt-7 bg-white">
          {/* Button Sidebar width change start */}
          <div
            className={`absolute cursor-pointer -right-3 top-[50px] transition-all duration-300 z-[999999] ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          >
            <i className="bi bi-arrow-left-circle w-7 text-[28px] text-custom-green-60 hover:text-custom-green-dark ease-in-out transition-all"></i>
          </div>
          {/* Button Sidebar width change start */}
          {/* Sidebar LOGO start */}
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
          {/* Sidebar LOGO end */}
          <ul className="pt-6">
            {/* Menu name start */}
            <div className="text-custom-green-dark font-semibold text-[14px] text-left">
              <p>Menu</p>
            </div>
            {/* Menu name end */}
            {/* Menu list START */}
            {Menus.map((Menu, index) => (
              <li key={index} className={`${Menu.gap ? "mt-9" : "mt-2"}`}>
                <NavLink
                  to={Menu.navLink}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-custom-green-dark text-white"
                        : "bg-custom-green-30 text-custom-green-dark"
                    } flex rounded-[10px] p-2 cursor-pointer hover:bg-custom-green-dark hover:text-white font-semibold text-sm items-center gap-x-4 transition-all duration-200`
                  }
                >
                  {/* ${index === 0 && "bg-custom-green-dark text-white"} */}
                  <i className={`${Menu.src} text-[20px] mx-[2px]`}></i>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </NavLink>
              </li>
            ))}
            {/* Menu list END */}
          </ul>
          </div>
        </div>
        {/* Sidebar END */}
        <div
          className={`flex-1 p-7 ${
            open ? "ml-[250px]" : "ml-[80px]"
          } transition-all duration-300`}
        >
          {/* Navbar START */}
          <div className="bg-custom-green-5 h-[60px] w-full rounded-[15px] flex mb-[20px]">
            <div className="h-full w-full flex items-center ml-[10px]">
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-calendar2-week font-medium"></i>
                <p className="ml-[10px] whitespace-nowrap">{formattedDate}</p>
              </div>
            </div>

            <div className="flex justify-end items-center w-full mr-[10px]">
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-bell font-medium"></i>
              </div>

              <div className="dropdown dropdown-bottom dropdown-end mx-[5px] w-[32px] h-[32px] text-custom-green-dark font-medium cursor-pointer">
                <i
                  tabIndex="0"
                  role="button"
                  className="bi bi-person font-medium w-[32px] h-[32px] rounded-[8px] bg-custom-green-30 hover:bg-custom-green-dark flex justify-center items-center hover:text-white transition-all duration-100 ease-in-out"
                ></i>

                <ul
                  tabIndex="0"
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[330px] p-2 shadow"
                >
                  <li>
                    <span className="hover:bg-custom-green-15">
                      <span className="mr-[10px] flex justify-center items-center">
                        {image === null ? (
                          <i className="bi bi-person-circle text-[25px]"></i>
                        ) : (
                          <img
                            className="rounded-full w-[40px] h-[40px] object-cover"
                            src={image}
                            alt={firstName}
                          />
                        )}
                      </span>
                      <span className="block">
                        <p className="my-[0px] text-[16px] font-bold">
                          {capitalizeFirstLetter(firstName)}{" "}
                          {capitalizeFirstLetter(lastName)}
                        </p>
                        <p className="text-[14px]">
                          {userType} |{" "}
                          {speciality === undefined ? "undefined" : speciality}
                        </p>
                      </span>
                    </span>
                  </li>

                  <li className="">
                    <span
                      className="text-custom-green-dark hover:text-white hover:bg-custom-green-dark"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      <i className="bi bi-box-arrow-right font-semibold text-[20px]"></i>
                      <button className="text-left">Logout</button>
                    </span>
                  </li>
                </ul>

                <dialog id="my_modal_1" className="modal overflow-hidden">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Log Out</h3>
                    <p className="py-4">Are you sure you want to Logout?</p>
                    <div className="modal-action flex justify-center items-center">
                      <button
                        onClick={deleteUserInfo}
                        className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark"
                      >
                        Yes
                      </button>

                      <form method="dialog">
                        <button className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark">
                          No
                        </button>
                      </form>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>

              {/* <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-person font-medium"></i>
              </div> */}
            </div>
          </div>
          {/* Navbar END */}
          {/* Content START */}
          <>
            <Outlet />
          </>
          {/* Content END */}
        </div>
      </div>
    </>
  );
}

export default RootLayoutMaster;
